import DatabaseClient from './../utils/database-connector';

describe('Testing the Database ORM', () => {
  it('checks if the connector actually works', async () => {
    const connection = await DatabaseClient.authenticate().then((err: any) => {
      if (!err) return true;
      return err
    });
    expect(connection).toBe(true);
  });
});
