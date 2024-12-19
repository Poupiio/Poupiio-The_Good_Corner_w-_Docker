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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ad = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Category_1 = require("./Category");
const Tag_1 = require("./Tag");
const Picture_1 = require("./Picture");
let Ad = class Ad extends typeorm_1.BaseEntity {
};
exports.Ad = Ad;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ad.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ad.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Ad.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Picture_1.Picture], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Picture_1.Picture, (picture) => picture.ad, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Ad.prototype, "pictures", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ad.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Ad.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Category_1.Category),
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, category => category.ads, { eager: true }),
    __metadata("design:type", Category_1.Category)
], Ad.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Tag_1.Tag], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => Tag_1.Tag, tag => tag.ads, { eager: true, cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Ad.prototype, "tags", void 0);
exports.Ad = Ad = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Ad);
//# sourceMappingURL=Ad.js.map