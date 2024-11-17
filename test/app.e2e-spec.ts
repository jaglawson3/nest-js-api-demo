import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    // await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
    app.close()
  });

  describe("Auth", () => {
    describe("Signup", () => {
      it.todo("should signup",
        // () => {
        //   const dto = {
        //     email: "vlad@gmail.com",
        //     password: "123",
        //   };
        //   return pactum
        //     .spec()
        //     .post("/auth/signup")
        //     .withBody(dto)
        //     .expectStatus(201)
        //     .inspect();
        // }
        );
    });

    describe("Signin", () => {
      it.todo("should signin");
    });
  });

  describe("User", () => {
    describe("Get current user", () => {});

    describe("Edit user", () => {});
  });

  describe("Bookmarks", () => {
    describe("Create bookmark", () => {});

    describe("Get bookmarks", () => {});

    describe("Get bookmark by id", () => {});

    describe("Edit bookmark", () => {});

    describe("Delete bookmark", () => {});
  });

  // afterAll(async () => {
  //   app.close();         
  // });

  it.todo("should pass");
});
