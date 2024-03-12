import { LookupStaffCommand } from "../../src/commands/LookupStaffCommand";
import { CommandResDTO } from "../../src/dto/response/CommandResDTO";
import { ServiceError } from "../../src/errors/ServiceError";
import { CommandExecutionError } from "../../src/errors/CommandExecutionError";
import { StaffService } from "../../src/services/StaffService";


jest.mock("../../src/services/StaffService");

describe("LookupStaffCommand", () => {
  let staffService: jest.Mocked<StaffService>
  const mockStaffRepo: any = {};
  const mockRedeemRepo: any = {};
  const staffPassId = "valid_id";

  staffService = new StaffService(mockStaffRepo, mockRedeemRepo) as jest.Mocked<StaffService>;
  let lookupStaffCommand: LookupStaffCommand = new LookupStaffCommand(staffPassId, staffService);
  
  it("execute returns correct result when staff exists", async () => {

    const mockResDTO: CommandResDTO = { resultMessage: "lookup-staff done: \n"
    + "Staff Record found:\n"
    + "StaffPassId: valid_id\n"
    + "TeamName: Engineering\n"
    + "This staff is eligible to redeem team's gift."};

    staffService.lookUpStaffByPassId.mockResolvedValue({
      staffPassId: staffPassId,
      teamName: "Engineering",
      isEligibleToRedeem: true,
    });

    const result: CommandResDTO = await lookupStaffCommand.execute();
    expect(result).toEqual(mockResDTO);
  });

  it("execute throws CommandExecutionError when ServiceError occurs", async () => {
    staffService.lookUpStaffByPassId.mockRejectedValue(new ServiceError("Service error message"));

    await expect(lookupStaffCommand.execute()).rejects.toThrow(CommandExecutionError);
  });

  it("execute rethrows error when error is not a ServiceError", async () => {
    const nonServiceError = new Error("Non-service error message");
    staffService.lookUpStaffByPassId.mockRejectedValue(nonServiceError);

    await expect(lookupStaffCommand.execute()).rejects.toThrow(nonServiceError);
  });
});
