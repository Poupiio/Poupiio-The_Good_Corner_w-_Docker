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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureResolver = void 0;
const Picture_1 = require("../entities/Picture");
const type_graphql_1 = require("type-graphql");
let PictureResolver = class PictureResolver {
    async getAllPictures() {
        const pictures = await Picture_1.Picture.find();
        return pictures;
    }
    async getPictureById(id) {
        const picture = await Picture_1.Picture.findOneByOrFail({ id: id });
        return picture;
    }
};
exports.PictureResolver = PictureResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Picture_1.Picture]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PictureResolver.prototype, "getAllPictures", null);
__decorate([
    (0, type_graphql_1.Query)(() => Picture_1.Picture),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PictureResolver.prototype, "getPictureById", null);
exports.PictureResolver = PictureResolver = __decorate([
    (0, type_graphql_1.Resolver)(Picture_1.Picture)
], PictureResolver);
//# sourceMappingURL=PictureResolver.js.map