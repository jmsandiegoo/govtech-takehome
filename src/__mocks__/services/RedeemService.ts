import { RedeemGiftResDTO } from "../../dto/response/RedeemGiftResDTO";
import { IRedeemService } from "../../services/IRedeemService";

export default class RedeemService implements IRedeemService {
    public redeemGift = jest.fn<Promise<RedeemGiftResDTO>, [string, Date | null]>();
}