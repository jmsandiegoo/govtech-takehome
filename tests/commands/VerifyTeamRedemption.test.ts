import { VerifyTeamRedemptionCommand } from "../../src/commands/VerifyTeamRedemptionCommand";
import { CommandResDTO } from "../../src/dto/response/CommandResDTO";
import { ServiceError } from "../../src/errors/ServiceError";
import { CommandExecutionError } from "../../src/errors/CommandExecutionError";
import { TeamService } from "../../src/services/TeamService";

jest.mock("../../src/services/TeamService");

describe("VerifyTeamRedemptionCommand", () => {
  let teamService: jest.Mocked<TeamService>;
  const mockTeamRepo: any = {};
  const mockRedeemRepo: any = {};
  const teamName = "Engineering";

  teamService = new TeamService(mockTeamRepo, mockRedeemRepo) as jest.Mocked<TeamService>;
  let verifyTeamRedemptionCommand: VerifyTeamRedemptionCommand = new VerifyTeamRedemptionCommand(teamName, teamService);

  it("execute returns correct result when team is eligible to redeem", async () => {
    const mockRes = {
      teamName: teamName,
      isEligibleToRedeem: true,
    };

    const mockResDTO: CommandResDTO = { resultMessage: "verify-team-redemption done: \n"
    + `${mockRes.teamName} has ${mockRes.isEligibleToRedeem ? 'not' : 'already'} redeemed`};
    
    teamService.verifyTeamRedemption.mockResolvedValue(mockRes);

    const result: CommandResDTO = await verifyTeamRedemptionCommand.execute();

    expect(result).toEqual(mockResDTO);
  });

  it("execute throws CommandExecutionError when ServiceError occurs", async () => {
    teamService.verifyTeamRedemption.mockRejectedValue(new ServiceError("Service error message"));

    await expect(verifyTeamRedemptionCommand.execute()).rejects.toThrow(CommandExecutionError);
  });

  it("execute rethrows error when error is not a ServiceError", async () => {
    const nonServiceError = new Error("Non-service error message");
    teamService.verifyTeamRedemption.mockRejectedValue(nonServiceError);

    await expect(verifyTeamRedemptionCommand.execute()).rejects.toThrow(nonServiceError);
  });
});
