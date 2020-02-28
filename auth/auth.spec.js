const request = require('supertest');

const server = require('../api/server')


describe("cohorts router", function() {
    it("should run the tests", function() {
      expect(true).toBe(true);
    });

    describe("GET /api/auth/users", function() {
        it("should return 401 since no session is provided", function() {
          return request(server)
            .get("/api/auth/users")
            .then(res => {
              expect(res.status).toBe(401);

            });
        });
    });
});