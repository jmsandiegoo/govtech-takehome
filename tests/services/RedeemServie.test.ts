
import { RedeemService } from "../../src/services/RedeemService";
import { Redeem } from "../../src/models/Redeem";
import { Team } from "../../src/models/Team";
import { RedeemGiftResDTO } from "../../src/dto/response/RedeemGiftResDTO";
import { ServiceError } from "../../src/errors/ServiceError";
import { TeamRepository } from "../../src/repositories/TeamRepository";
import { RedeemRepository } from "../../src/repositories/RedeemRepository";

jest.mock("../../src/repositories/TeamRepository");
jest.mock("../../src/repositories/RedeemRepository");

describe("RedeemService", () => {
  let redeemService: RedeemService;
  let mockTeamRepo: jest.Mocked<TeamRepository>;
  let mockRedeemRepo: jest.Mocked<RedeemRepository>;
  const mockDb = {}; // not really used

  beforeEach(() => {
    mockTeamRepo = new TeamRepository(
      mockDb as any
    ) as jest.Mocked<TeamRepository>;
    mockRedeemRepo = new RedeemRepository(
      mockDb as any
    ) as jest.Mocked<RedeemRepository>;
    redeemService = new RedeemService(mockTeamRepo, mockRedeemRepo);
  });

  it("redeemGift returns correct result when team exists and has not redeemed before", async () => {
    const mockTeam: Team = {
      teamName: "Engineering",
      createdAt: new Date(),
    };
    mockTeamRepo.getTeamByName.mockResolvedValue(mockTeam);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);
    const mockRedeem: Redeem = {
      redeemId: "redeem_id",
      teamName: "Engineering",
      redeemedAt: new Date(),
    };
    mockRedeemRepo.createRedeem.mockResolvedValue(mockRedeem);

    const result: RedeemGiftResDTO = await redeemService.redeemGift("Engineering", new Date());

    expect(result).toEqual({
      redeemId: "redeem_id",
      teamName: "Engineering",
      redeemedAt: mockRedeem.redeemedAt,
    });
  });

  it("redeemGift throws ServiceError when team does not exist", async () => {
    mockTeamRepo.getTeamByName.mockResolvedValue(null);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);

    await expect(redeemService.redeemGift("NonExistentTeam", new Date())).rejects.toThrow(ServiceError);
  });

  it("redeemGift throws ServiceError when team has already redeemed", async () => {
    const mockTeam: Team = {
      teamName: "Engineering",
      createdAt: new Date(),
    };
    const mockRedeem: Redeem = {
      redeemId: "redeem_id",
      teamName: "Engineering",
      redeemedAt: new Date(),
    };
    mockTeamRepo.getTeamByName.mockResolvedValue(mockTeam);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(mockRedeem);

    await expect(redeemService.redeemGift("Engineering", new Date())).rejects.toThrow(ServiceError);
  });

  it("redeemGift throws ServiceError when redeem creation fails", async () => {
    const mockTeam: Team = {
      teamName: "Engineering",
      createdAt: new Date(),
    };
    mockTeamRepo.getTeamByName.mockResolvedValue(mockTeam);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);
    mockRedeemRepo.createRedeem.mockResolvedValue(null);

    await expect(redeemService.redeemGift("Engineering", new Date())).rejects.toThrow(ServiceError);
  });
});
