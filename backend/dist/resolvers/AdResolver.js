"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdResolver = void 0;
const AdInput_1 = __importDefault(require("../inputs/AdInput"));
const Ad_1 = require("../entities/Ad");
const type_graphql_1 = require("type-graphql");
const UpdateAdInput_1 = __importDefault(require("../inputs/UpdateAdInput"));
let AdResolver = class AdResolver {
    async getAllAds() {
        const ads = await Ad_1.Ad.find({
            order: {
                id: "DESC",
                pictures: {
                    id: "DESC",
                },
            },
        });
        return ads;
    }
    async getAdById(id) {
        const ad = await Ad_1.Ad.findOne({
            where: { id: id },
            order: { pictures: { id: "DESC" } },
        });
        if (ad === null) {
            throw new Error("Cannot find ad with id " + id);
        }
        return ad;
    }
    async createNewAd(newData) {
        const newAd = Ad_1.Ad.create(Object.assign({}, newData));
        const adToSave = await newAd.save();
        return adToSave;
    }
    async removeAd(id) {
        await Ad_1.Ad.delete(id);
        return "The ad has been successfully deleted!";
    }
    async updateAd(dataToUpdate) {
        let adToUpdate = await Ad_1.Ad.findOneByOrFail({ id: dataToUpdate.id });
        adToUpdate = Object.assign(adToUpdate, dataToUpdate);
        const adUpdated = await adToUpdate.save();
        return adUpdated;
    }
};
exports.AdResolver = AdResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Ad_1.Ad]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "getAllAds", null);
__decorate([
    (0, type_graphql_1.Query)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "getAdById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdInput_1.default]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "createNewAd", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "removeAd", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Ad_1.Ad),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateAdInput_1.default]),
    __metadata("design:returntype", Promise)
], AdResolver.prototype, "updateAd", null);
exports.AdResolver = AdResolver = __decorate([
    (0, type_graphql_1.Resolver)(Ad_1.Ad)
], AdResolver);
//# sourceMappingURL=AdResolver.js.map