import { RedeemGiftCommand } from "../../src/commands/RedeemGiftCommand";
import { CommandResDTO } from "../../src/dto/response/CommandResDTO";
import { ServiceError } from "../../src/errors/ServiceError";
import { CommandExecutionError } from "../../src/errors/CommandExecutionError";
import { RedeemService } from "../../src/services/RedeemService";

jest.mock("../../src/services/RedeemService");

describe("RedeemGiftCommand", () => {
  let redeemService: jest.Mocked<RedeemService>;
  const mockTeamRepo: any = {};
  const mockRedeemRepo: any = {};
  const teamName = "Engineering";

  redeemService = new RedeemService(mockTeamRepo, mockRedeemRepo) as jest.Mocked<RedeemService>;
  let redeemGiftCommand: RedeemGiftCommand = new RedeemGiftCommand(teamName, redeemService);

  it("execute returns correct result when redemption is successful", async () => {
    
    const mockRes = {
      teamName: teamName,
      redeemId: "redeem_id",
      redeemedAt: new Date(),
    };

    const mockResDTO: CommandResDTO = { resultMessage: "redeem-gift done: \n"
    + `${mockRes.teamName} has successfully redeemed the gift. \n`
    + `redeemId: ${mockRes.redeemId} \n`
    + `redeemedAt: ${mockRes.redeemedAt}`};

    redeemService.redeemGift.mockResolvedValue(mockRes);

    const result: CommandResDTO = await redeemGiftCommand.execute();

    expect(result).toEqual(mockResDTO);
  });

  it("execute throws CommandExecutionError when ServiceError occurs", async () => {
    redeemService.redeemGift.mockRejectedValue(new ServiceError("Service error message"));

    await expect(redeemGiftCommand.execute()).rejects.toThrow(CommandExecutionError);
  });

  it("execute rethrows error when error is not a ServiceError", async () => {
    const nonServiceError = new Error("Non-service error message");
    redeemService.redeemGift.mockRejectedValue(nonServiceError);

    await expect(redeemGiftCommand.execute()).rejects.toThrow(nonServiceError);
  });
});
