import { StaffLookUpResDTO } from "../../dto/response/StaffLookupResDTO";
import { IStaffService } from "../../services/IStaffService";

export default class StaffService implements IStaffService {
    public lookUpStaffByPassId = jest.fn<Promise<StaffLookUpResDTO>, [string]>();
}