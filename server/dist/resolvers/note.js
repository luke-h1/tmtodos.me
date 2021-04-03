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
require("dotenv/config");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const Note_1 = require("../entities/Note");
const isAuth_1 = require("../utils/isAuth");
const User_1 = require("../entities/User");
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
let PaginatedNotes = class PaginatedNotes {
};
__decorate([
    type_graphql_1.Field(() => [Note_1.Note]),
    __metadata("design:type", Array)
], PaginatedNotes.prototype, "notes", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatedNotes.prototype, "hasMore", void 0);
PaginatedNotes = __decorate([
    type_graphql_1.ObjectType()
], PaginatedNotes);
let noteResolver = class noteResolver {
    textSnippet(note) {
        return note.text.slice(0, 50);
    }
    creator(note, { userLoader }) {
        return userLoader.load(note.creatorId);
    }
    notes(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(150, limit);
            const realLimitPlusOne = realLimit + 1;
            const replacements = [realLimitPlusOne];
            if (cursor) {
                replacements.push(new Date(parseInt(cursor)));
            }
            const notes = yield typeorm_1.getConnection().query(`
        SELECT n.* 
        from note n 
        ${cursor ? `where n."createdAt" < $2` : ""}
        ORDER BY n."createdAt" DESC 
        limit $1
      `, replacements);
            return {
                notes: notes.slice(0, realLimit),
                hasMore: notes.length === realLimitPlusOne,
            };
        });
    }
    note(id) {
        return Note_1.Note.findOne(id);
    }
    createNote(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new Error("not authenticated");
            }
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return Note_1.Note.create(Object.assign(Object.assign({}, input), { creatorId: payload.userId })).save();
        });
    }
    updateNote(id, title, text, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new Error("not authenticated");
            }
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Note_1.Note)
                .set({ title, text })
                .where('id = :id and "creatorId" = :creatorId', {
                id,
                creatorId: payload.userId,
            })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteNote(id, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw new Error("not authenticated");
            }
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            yield Note_1.Note.delete({ id, creatorId: payload.userId });
            return true;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Note_1.Note]),
    __metadata("design:returntype", void 0)
], noteResolver.prototype, "textSnippet", null);
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Note_1.Note, Object]),
    __metadata("design:returntype", void 0)
], noteResolver.prototype, "creator", null);
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
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NoteInput, Object]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "createNote", null);
__decorate([
    type_graphql_1.Mutation(() => Note_1.Note, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("title")),
    __param(2, type_graphql_1.Arg("text")),
    __param(3, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "updateNote", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], noteResolver.prototype, "deleteNote", null);
noteResolver = __decorate([
    type_graphql_1.Resolver(Note_1.Note)
], noteResolver);
exports.noteResolver = noteResolver;
//# sourceMappingURL=note.js.map