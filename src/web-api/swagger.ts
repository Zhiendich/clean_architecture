export const swaggerOptions = {
  swaggerDefinition: {
    myapi: "3.0.0",
    info: {
      title: "Clean architecture",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};
