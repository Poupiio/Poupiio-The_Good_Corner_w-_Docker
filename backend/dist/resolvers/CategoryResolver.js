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
exports.CategoryResolver = void 0;
const CategoryInput_1 = __importDefault(require("../inputs/CategoryInput"));
const Category_1 = require("../entities/Category");
const type_graphql_1 = require("type-graphql");
let CategoryResolver = class CategoryResolver {
    async getAllCategories() {
        const categories = await Category_1.Category.find();
        return categories;
    }
    async getCategoryById(id) {
        const category = await Category_1.Category.findOneByOrFail({ id: id });
        return category;
    }
    async createNewCategory(newData) {
        const newCategory = new Category_1.Category();
        newCategory.name = newData.name;
        const categoryUpdated = await newCategory.save();
        return categoryUpdated;
    }
    async updateCategory(id, dataToUpdate) {
        let categoryToUpdate = await Category_1.Category.findOneByOrFail({ id: id });
        categoryToUpdate = Object.assign(categoryToUpdate, dataToUpdate);
        const categoryUpdated = await categoryToUpdate.save();
        return categoryUpdated;
    }
    async removeCategory(id) {
        await Category_1.Category.delete(id);
        return "The category has been successfully deleted!";
    }
};
exports.CategoryResolver = CategoryResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Category_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getAllCategories", null);
__decorate([
    (0, type_graphql_1.Query)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "getCategoryById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryInput_1.default]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createNewCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Category_1.Category),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CategoryInput_1.default]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "removeCategory", null);
exports.CategoryResolver = CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)(Category_1.Category)
], CategoryResolver);
//# sourceMappingURL=CategoryResolver.js.map