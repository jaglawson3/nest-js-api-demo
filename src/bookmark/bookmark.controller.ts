import { Controller, UseGuards, Body, Get, Post, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { JwtGuard } from "../auth/guard";
import { GetUser } from '../auth/decorator';
import {BookmarkService} from "./bookmark.service";
import { CreateBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {

    }
    
    // routes
    @Get()
    getBookmarks(@GetUser('id') userId: number) {}

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number) {}


    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {}
    
    @Patch()
    editBookmarkById(@GetUser('id') userId: number) {}

    @Delete()
    deleteBookmarkById(@GetUser('id') userId: number) {}
    
}
