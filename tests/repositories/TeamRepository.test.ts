import { Database } from "../../src/database/Database";
import { TeamRepository } from "../../src/repositories/TeamRepository";

describe("Team Repository", () => {
    let teamRepo: TeamRepository;
    let dbService: Database;

    beforeAll(() => {
        dbService = new Database();
        teamRepo = new TeamRepository(dbService);
    });

    afterAll(() => {
        dbService.dbDestroy();
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getTeamByName returns a team object when team name exists", async () => {
        const teamName = "BASS";

        const mockTeamData = {
            team_name: "BASS", 
            created_at: new Date("2022-01-01"),
        };

        const team = await teamRepo.getTeamByName(teamName);

        expect(team).toEqual({
            teamName: mockTeamData.team_name,
            createdAt: expect.any(Date),
        });
    });

    test("getStaffByPassId returns a null object when team name does not exists", async () => {
        const teamName = "NON_EXISTENT_ID";

        const team = await teamRepo.getTeamByName(teamName);
        expect(team).toBeNull();
    });
});