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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const Note_1 = require("../entities/Note");
const isAuth_1 = require("../utils/isAuth");
let NoteInput = class NoteInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NoteInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NoteInput.prototype, "text", void 0);
NoteInput = __decorate([
    type_graphql_1.InputType()
], NoteInput);
let noteResolver = class noteResolver {
    notes(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const qb = typeorm_1.getConnection()
                .getRepository(Note_1.Note)
                .createQueryBuilder("n")
                .orderBy('"createdAt", "DESC"')
                .take(realLimit);
            if (cursor) {
                qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
            }
            return qb.getMany();
        });
    }
    note(id) {
        return Note_1.Note.findOne(id);
    }
    createNote(title, text, { context }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = context.req.headers.authorization;
            if (!authorization) {
                throw new Error("not authenticated");
            }
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return Note_1.Note.create({
                title,
                text,
                creatorId: payload.userId,
            }).save();
        });
    }
    updatePost(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const note = yield Note_1.Note.findOne(id);
            if (!note) {
                return null;
            }
            if (typeof title !== "undefined") {
                note.title = title;
                yield Note_1.Note.update({ id }, { title });
            }
            return note;
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Note_1.Note.delete(id);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Note_1.Note]),
    __param(0, type_graphql_1.Arg("limit")),
    __param(1, type_graphql_1.Arg("cursor", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "notes", null);
__decorate([
    type_graphql_1.Query(() => Note_1.Note, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "note", null);
__decorate([
    type_graphql_1.Mutation(() => Note_1.Note),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("title")),
    __param(1, type_graphql_1.Arg("text")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "createNote", null);
__decorate([
    type_graphql_1.Mutation(() => Note_1.Note, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("title", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "updatePost", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "deleteNote", null);
noteResolver = __decorate([
    type_graphql_1.Resolver()
], noteResolver);
exports.noteResolver = noteResolver;
//# sourceMappingURL=note.js.map