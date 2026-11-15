import { useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, NavigationControl, Popup, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { WRIGLEY_FIELD_PROXIMITY } from "../../become-host/utils/mapboxAddress";
import type { Driveway } from "../hooks/useFindParking";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined;

interface DrivewayPin {
    id: string;
    address: string;
    price: number;
    latitude: number;
    longitude: number;
}

interface DrivewayMapProps {
    driveways: Driveway[];
    onSelectDriveway: (drivewayId: string) => void;
    className?: string;
}

export function DrivewayMap({ driveways, onSelectDriveway, className }: DrivewayMapProps) {
    const mapRef = useRef<MapRef>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

    const pins = useMemo<DrivewayPin[]>(() =>
        driveways.flatMap((driveway) => {
            const latitude = Number(driveway.latitude);
            const longitude = Number(driveway.longitude);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];
            return [{ id: driveway._id, address: driveway.address, price: driveway.price, latitude, longitude }];
        }),
    [driveways]);

    const selectedPin = pins.find((pin) => pin.id === selectedPinId) ?? null;

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isMapLoaded || pins.length === 0) return;

        if (pins.length === 1) {
            map.flyTo({ center: [pins[0].longitude, pins[0].latitude], zoom: 14 });
            return;
        }

        const longitudes = pins.map((pin) => pin.longitude);
        const latitudes = pins.map((pin) => pin.latitude);
        map.fitBounds(
            [
                [Math.min(...longitudes), Math.min(...latitudes)],
                [Math.max(...longitudes), Math.max(...latitudes)],
            ],
            { padding: 60, maxZoom: 15, duration: 0 },
        );
    }, [pins, isMapLoaded]);

    if (!MAPBOX_ACCESS_TOKEN) {
        return (
            <div className={`flex items-center justify-center bg-surface-subtle text-sm text-text-muted ${className ?? ""}`}>
                Map unavailable — VITE_MAPBOX_ACCESS_TOKEN is missing.
            </div>
        );
    }

    return (
        <div className={className}>
            <Map
                ref={mapRef}
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                initialViewState={{ longitude: WRIGLEY_FIELD_PROXIMITY.lng, latitude: WRIGLEY_FIELD_PROXIMITY.lat, zoom: 14 }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                style={{ width: "100%", height: "100%" }}
                onLoad={() => setIsMapLoaded(true)}
            >
                <NavigationControl position="top-right" showCompass={false} />

                {pins.map((pin) => (
                    <Marker
                        key={pin.id}
                        longitude={pin.longitude}
                        latitude={pin.latitude}
                        anchor="bottom"
                        onClick={(event) => {
                            // Prevent the map's own click handler from immediately closing the popup.
                            event.originalEvent.stopPropagation();
                            setSelectedPinId(pin.id);
                        }}
                    >
                        <button
                            type="button"
                            aria-label={`${pin.address}, $${pin.price}`}
                            className={`cursor-pointer rounded-full border-2 border-white px-2.5 py-1 text-xs font-semibold shadow-md transition-colors ${
                                pin.id === selectedPinId ? "bg-text-main text-white" : "bg-primary text-white hover:bg-primary-hover"
                            }`}
                        >
                            ${pin.price}
                        </button>
                    </Marker>
                ))}

                {selectedPin && (
                    <Popup
                        longitude={selectedPin.longitude}
                        latitude={selectedPin.latitude}
                        anchor="top"
                        offset={8}
                        closeOnClick={false}
                        onClose={() => setSelectedPinId(null)}
                    >
                        <button
                            type="button"
                            onClick={() => onSelectDriveway(selectedPin.id)}
                            className="block cursor-pointer rounded pr-4 text-left text-text-main hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                        >
                            <span className="block text-sm font-semibold">{selectedPin.address}</span>
                            <span className="mt-1 block text-sm text-text-muted">${selectedPin.price}</span>
                        </button>
                    </Popup>
                )}
            </Map>
        </div>
    );
}
