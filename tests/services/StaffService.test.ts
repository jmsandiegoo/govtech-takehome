import { StaffRepository } from "../../src/repositories/StaffRepository";
import { RedeemRepository } from "../../src/repositories/RedeemRepository";
import { StaffService } from "../../src/services/StaffService";
import { Staff } from "../../src/models/Staff";
import { ServiceError } from "../../src/errors/ServiceError";

jest.mock("../../src/repositories/StaffRepository");
jest.mock("../../src/repositories/RedeemRepository");

describe("StaffService", () => {
  let staffService: StaffService;
  let mockStaffRepo: jest.Mocked<StaffRepository>;
  let mockRedeemRepo: jest.Mocked<RedeemRepository>;
  const mockDb = {}; // not really used

  beforeEach(() => {
    mockStaffRepo = new StaffRepository(
      mockDb as any
    ) as jest.Mocked<StaffRepository>;
    mockRedeemRepo = new RedeemRepository(
      mockDb as any
    ) as jest.Mocked<RedeemRepository>;
    staffService = new StaffService(mockStaffRepo, mockRedeemRepo);
  });

  it("lookUpStaffByPassId return eligible staff information when staff exists", async () => {
    const mockStaff: Staff = {
      staffPassId: "staff_test_id",
      teamName: "Engineering",
      createdAt: new Date(),
    };
    mockStaffRepo.getStaffByPassId.mockResolvedValue(mockStaff);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);

    const result = await staffService.lookUpStaffByPassId("123");

    expect(result).toEqual({
      staffPassId: "staff_test_id",
      teamName: "Engineering",
      isEligibleToRedeem: true,
    });
  });

  it("lookUpStaffByPassId throws ServiceError when staff does not exist", async () => {
    mockStaffRepo.getStaffByPassId.mockResolvedValue(null);
    mockRedeemRepo.getRedeemByTeamName.mockResolvedValue(null);
  
    await expect(staffService.lookUpStaffByPassId('non_existent_id')).rejects.toThrow(ServiceError);
  });
});
