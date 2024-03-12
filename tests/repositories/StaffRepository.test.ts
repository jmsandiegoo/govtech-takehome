import { Database } from "../../src/database/Database";
import { StaffRepository } from "../../src/repositories/StaffRepository";

describe("Staff Repository", () => {
    let staffRepo: StaffRepository;
    let dbService: Database;

    beforeAll(() => {
        dbService = new Database();
        staffRepo = new StaffRepository(dbService);
    });

    afterAll(() => {
        dbService.dbDestroy();
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getStaffByPassId returns a staff object when staff exists", async () => {
        const staffPassId = "STAFF_H123804820G";

        const mockStaffData = {
            staff_pass_id: "STAFF_H123804820G", 
            team_name: "BASS",
            created_at: new Date("2022-01-01"),
        };

        const staff = await staffRepo.getStaffByPassId(staffPassId);
        // Check if the staff details match the mock data
        expect(staff).toEqual({
            staffPassId: mockStaffData.staff_pass_id,
            teamName: mockStaffData.team_name,
            createdAt: expect.any(Date),
        });
    });

    test("getStaffByPassId returns a null object when staff does not exists", async () => {
        const staffPassId = "NON_EXISTENT_ID";

        const staff = await staffRepo.getStaffByPassId(staffPassId);
        // Check if the staff details match the mock data
        expect(staff).toBeNull();
    });
});