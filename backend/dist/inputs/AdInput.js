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
const Category_1 = require("../entities/Category");
const type_graphql_1 = require("type-graphql");
let PictureInput = class PictureInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PictureInput.prototype, "url", void 0);
PictureInput = __decorate([
    (0, type_graphql_1.InputType)()
], PictureInput);
let TagInput = class TagInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], TagInput.prototype, "id", void 0);
TagInput = __decorate([
    (0, type_graphql_1.InputType)()
], TagInput);
let AdInput = class AdInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdInput.prototype, "owner", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], AdInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdInput.prototype, "location", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", Category_1.Category)
], AdInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [PictureInput], { nullable: true }),
    __metadata("design:type", Array)
], AdInput.prototype, "pictures", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [TagInput], { nullable: true }),
    __metadata("design:type", Array)
], AdInput.prototype, "tags", void 0);
AdInput = __decorate([
    (0, type_graphql_1.InputType)()
], AdInput);
exports.default = AdInput;
//# sourceMappingURL=AdInput.js.map