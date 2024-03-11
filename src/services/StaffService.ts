import { StaffLookUpResDTO } from "../dto/response/StaffLookupResDTO";
import { Staff } from "../models/Staff";
import { IStaffRepository } from "../repositories/IStaffRepository";
import { IRedeemRepository } from "../repositories/IRedeemRepository";
import { Redeem } from "../models/Redeem";
import { IStaffService } from "./IStaffService";
import { ServiceError } from "../errors/ServiceError";

export class StaffService implements IStaffService {
    private staffRepository: IStaffRepository;
    private redeemRepository: IRedeemRepository;

    constructor(staffRepository: IStaffRepository, redeemRepository: IRedeemRepository) {
        this.staffRepository = staffRepository;
        this.redeemRepository = redeemRepository;
    }

    /**
     * @Overrides
     */
    public async lookUpStaffByPassId(staffPassId: string): Promise<StaffLookUpResDTO> {
        const staff: Staff | null = await this.staffRepository.getStaffByPassId(staffPassId);

        if (!staff) {
            throw new ServiceError("Staff does not exist");
        }

        const redeem: Redeem | null = await this.redeemRepository.getRedeemByTeamName(staff.teamName);

        return {
            staffPassId: staff.staffPassId,
            teamName: staff.teamName,
            isEligibleToRedeem: redeem ? false : true,
        }
    }
}