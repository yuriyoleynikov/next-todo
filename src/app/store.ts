import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export interface IProject {
    id: number,
    name: string,
    done: boolean,
    description: string
}

export class Store {
    constructor() {
        makeAutoObservable(this)
    }

    projects: IProject[] = []

    editId: number | null = null
    newProjectName: string = ''
    newProjectDescription: string = ''
    projectName: string = ''
    openDelete: boolean = false
    openNewProject: boolean = false

    setOpenNewProject(status: boolean) {
        this.openNewProject = status
    }
    setOpenDelete(status: boolean) {
        this.openDelete = status
    }

    editStart(id: number) {
        this.editId = id
        this.projectName = this.projects.find(project => project.id == id)?.name ?? ''
    }

    addProject() {
        if (this.newProjectName.length !== 0) {
            let newId = 1
            if (this.projects.length !== 0) {
                newId = this.projects[this.projects.length - 1].id
                newId++
            }

            this.projects = [...this.projects,
            {
                id: newId,
                name: this.newProjectName,
                description: this.newProjectDescription,
                done: false
            }]

            this.newProjectName = ''
            this.newProjectDescription = ''
        }
    }

    deleteProject(id: number) {
        this.projects = this.projects.filter(task => task.id !== id)
    }



    editSaveAndOff() {
        this.projects = this.projects.map(project => project.id == this.editId ? { ...project, name: this.projectName } : project)
        this.editId = null
        this.projectName = ''
    }

    editCancelAndOff() {
        this.editId = null
        this.projectName = ''
    }

    changeNewProjectName(name: string) {
        this.newProjectName = name
    }
    changeProjectName(name: string) {
        this.projectName = name
    }

    changeNewProjectDescription(description: string) {
        this.newProjectDescription = description
    }

    changeProjectStatus(id: number) {
        this.projects = this.projects.map(project => project.id == id ? { ...project, done: !project.done } : project)
    }
}

export const myStore = new Store()