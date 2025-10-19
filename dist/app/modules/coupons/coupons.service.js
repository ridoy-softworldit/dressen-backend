"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const handleAppError_1 = __importDefault(require("../../errors/handleAppError"));
const coupons_const_1 = require("./coupons.const");
const coupons_model_1 = require("./coupons.model");
const http_status_1 = __importDefault(require("http-status"));
const getAllCouponsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const couponQuery = new QueryBuilder_1.default(coupons_model_1.CouponModel.find(), query)
        .search(coupons_const_1.CouponSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield couponQuery.modelQuery;
    return result;
});
const getSingleCouponFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = coupons_model_1.CouponModel.findById(id);
    if (!result) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, "Coupon does not exists!");
    }
    return result;
});
const createCouponIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCouponExists = yield coupons_model_1.CouponModel.findOne({ code: payload === null || payload === void 0 ? void 0 : payload.code });
    if (isCouponExists) {
        throw new handleAppError_1.default(http_status_1.default.CONFLICT, "Coupon already exists!");
    }
    const result = yield coupons_model_1.CouponModel.create(payload);
    return result;
});
exports.couponServices = {
    getAllCouponsFromDB,
    getSingleCouponFromDB,
    createCouponIntoDB,
};
