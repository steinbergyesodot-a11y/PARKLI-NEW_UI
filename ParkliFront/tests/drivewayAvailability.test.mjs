import assert from "node:assert/strict";
import test from "node:test";
import { rankDrivewaysByAvailability } from "../src/features/find-parking/utils/drivewayAvailability.ts";

const game = (date, overrides = {}) => ({
    _id: date,
    visiting_team: "Visitors",
    game_time: "7:00 PM",
    parkingBegins: "5:00 PM",
    date,
    booked: false,
    blocked: false,
    ...overrides,
});
const selectedDate = "2026-07-04";

test("keeps the original order and unknown availability before selection", () => {
    const driveways = [{ id: "one", games: [] }, { id: "two", games: [game("2026-07-04")] }];
    const result = rankDrivewaysByAvailability(driveways, null);
    assert.deepEqual(result.map(({ driveway, isAvailable }) => [driveway.id, isAvailable]), [
        ["one", null],
        ["two", null],
    ]);
});

test("ranks available spots first using the selected calendar date and preserves group order", () => {
    const driveways = [
        { id: "booked", games: [game("2026-07-04T00:00:00.000Z", { booked: true })] },
        { id: "open", games: [game("2026-07-04T00:10:00Z")] },
        { id: "missing", games: [game("2026-07-05")] },
        { id: "blocked", games: [game("2026-07-04", { blocked: true })] },
        { id: "also-open", games: [game("2026-07-04T00:00:00Z")] },
        { id: "mixed", games: [game("2026-07-04"), game("2026-07-04", { booked: true })] },
    ];
    const result = rankDrivewaysByAvailability(driveways, selectedDate);
    assert.deepEqual(result.map(({ driveway, isAvailable }) => [driveway.id, isAvailable]), [
        ["open", true],
        ["also-open", true],
        ["booked", false],
        ["missing", false],
        ["blocked", false],
        ["mixed", false],
    ]);
    assert.equal(driveways[0].id, "booked");
});

test("recalculates availability for a different selected date", () => {
    const driveways = [
        { id: "first", games: [game("2026-07-04")] },
        { id: "second", games: [game("2026-07-05")] },
    ];
    const result = rankDrivewaysByAvailability(driveways, "2026-07-05");
    assert.deepEqual(result.map(({ driveway, isAvailable }) => [driveway.id, isAvailable]), [
        ["second", true],
        ["first", false],
    ]);
});

test("does not treat invalid or missing game dates as available", () => {
    const driveways = [{ id: "invalid", games: [game("not-a-date")] }, { id: "empty", games: [] }];
    assert.ok(rankDrivewaysByAvailability(driveways, selectedDate).every(({ isAvailable }) => !isAvailable));
});
