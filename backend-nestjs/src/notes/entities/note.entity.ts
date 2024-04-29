import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column({ default: false })
    completed: boolean
}