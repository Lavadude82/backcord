export default interface IUserRepository {
    create(user: any): Promise<any>;
    findByUsername(username: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    findById(id: string): Promise<any>;
}