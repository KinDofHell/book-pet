// __mocks__/mongoose.ts
const mongoose =
  jest.createMockFromModule<typeof import("mongoose")>("mongoose");

mongoose.connect = jest.fn().mockResolvedValue({
  connection: {
    db: { databaseName: "mockDB" },
  },
});

export default mongoose;
