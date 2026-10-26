import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ROUTE_REGISTRY } from "../../routing/registry";
import Button from "./Button";

interface AvatarDropdownProps {
    open: boolean;
    onClose: () => void;
}

export function AvatarDropdown({ open, onClose }: AvatarDropdownProps) {
    const { user,logout } = useAuth();
    const navigate = useNavigate();
    const linkClassName = "rounded-md px-3 py-2.5 text-sm font-medium text-text-main hover:bg-surface-subtle";

    const handleLogout = async () => {
        onClose();
        await logout();
        navigate(ROUTE_REGISTRY.HOME.path);
    };

    if (!open) return null;

    return (
        <div id="account-dropdown" className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-md border border-border-subtle bg-surface-base p-2 text-text-main shadow-lg">
            <nav aria-label="Account" className="flex flex-col gap-1">
                
                    <>
                        <p className="break-words px-3 py-2 text-sm text-text-muted">Hello, {user?.firstName || user?.email}</p>
                        <Button to={ROUTE_REGISTRY.MY_BOOKINGS.path} variant="ghost" className={linkClassName} onClick={onClose}>
                            My bookings
                        </Button>
                        <Button to={ROUTE_REGISTRY.MY_LISTINGS.path} variant="ghost" className={linkClassName} onClick={onClose}>
                            My listings
                        </Button>
                        <hr className="my-1 border-border-subtle" />
                        <button type="button" className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-danger hover:bg-danger-subtle" onClick={handleLogout}>
                            Log out
                        </button>
                    </>
              
            </nav>
        </div>
    );
}