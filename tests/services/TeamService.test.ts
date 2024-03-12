import { TeamService } from "../../src/services/TeamService";
import { Team } from "../../src/models/Team";
import { Redeem } from "../../src/models/Redeem";
import { VerifyTeamRedemptionResDTO } from "../../src/dto/response/VerifyTeamRedemptionResDTO";
import { ServiceError } from "../../src/errors/ServiceError";
import { TeamRepository } from "../../src/repositories/TeamRepository";
import { RedeemRepository } from "../../src/repositories/RedeemRepository";

jest.mock("../../src/repositories/TeamRepository");
jest.mock("../../src/repositories/RedeemRepository");

describe("TeamService", () => {
  let teamService: TeamService;
  let mockTeamRepo: jest.Mocked<TeamRepository>;
  let mockRedeemRepo: jest.Mocked<RedeemRepository>;
  const mockDb = {}; // not really used

  beforeEach(() => {
    mockTeamRepo = new TeamRepository(mockDb as any) as jest.Mocked<TeamRepository>;
    mockRedeemRepo = new RedeemRepository(mockDb as any) as jest.Mocked<RedeemRepository>;
    teamService = new TeamService(mockTeamRepo, mockRedeemRepo);
  });

  it("verifyTeamRedemption returns correct result when team exists and is eligible", async () => {
    const mockTeam: Team = {
        teamName: "Engineering",
        createdAt: new Date(),
    };
    const mockRedeem: Redeem | null = null;
    mockTeamRepo.getTeamByName.mockResolvedValue(mockTeam);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(mockRedeem);

    const result: VerifyTeamRedemptionResDTO = await teamService.verifyTeamRedemption("Engineering");

    expect(result).toEqual({
      isEligibleToRedeem: true,
      teamName: "Engineering",
    });
  });

  it("verifyTeamRedemption throws ServiceError when team does not exist", async () => {
    mockTeamRepo.getTeamByName.mockResolvedValue(null);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);

    await expect(teamService.verifyTeamRedemption("NonExistentTeam")).rejects.toThrow(ServiceError);
  });

  it("verifyTeamRedemption returns correct result when team exists but is not eligible", async () => {
    const mockTeam: Team = {
      teamName: "Engineering",
      createdAt: new Date(),
    };
    const mockRedeem: Redeem = {
      redeemId: "NEW_REDEEM_VALUE",
      teamName: "Engineering",
      redeemedAt: new Date(),
    };
    mockTeamRepo.getTeamByName.mockResolvedValue(mockTeam);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(mockRedeem);

    const result: VerifyTeamRedemptionResDTO = await teamService.verifyTeamRedemption("Engineering");

    expect(result).toEqual({
      isEligibleToRedeem: false,
      teamName: "Engineering",
    });
  });
});
