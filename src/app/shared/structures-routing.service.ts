import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StructuresRoutingService {


  postData$ = new Subject<string>();

  data: { faculty: string, name: string, users: string, structures: { structureName: string, structureUsers: number }[] }[] = [
    {
      'faculty': 'Геологоразведочный факультет', 'name': 'Ivan', 'users': '212', 'structures': [
        { 'structureName': 'Кафедра геофизических и геохимических методов поисков и разведки месторождений полезных ископаемых', 'structureUsers': 11 },
        { 'structureName': 'Кафедра геологии и разведки месторождений полезных ископаемых', 'structureUsers': 21 },
        { 'structureName': 'Кафедра минералогии, кристаллографии и петрографии', 'structureUsers': 11 },
        { 'structureName': 'Кафедра исторической и динамической геологии', 'structureUsers': 3 },
        { 'structureName': 'Кафедра гидрогеологии и инженерной геологии', 'structureUsers': 1 },
        { 'structureName': 'Кафедра геологии нефти и газа', 'structureUsers': 14 },
      ]
    },
    {
      'faculty': 'Горный факультет', 'name': 'Петров', 'users': '32', 'structures': [
        { 'structureName': 'Кафедра разработки месторождений полезных ископаемых', 'structureUsers': 11 },
        { 'structureName': 'Кафедра безопасности производств', 'structureUsers': 21 },
        { 'structureName': 'Кафедра взрывного дела', 'structureUsers': 11 },
        { 'structureName': 'Кафедра геоэкологии', 'structureUsers': 3 },
      ]
    },
    {
      'faculty': 'Механико-машиностроительный факультет', 'name': 'Сидоров', 'users': '17', 'structures': [
        { 'structureName': 'Кафедра машиностроения', 'structureUsers': 11 },
        { 'structureName': 'Кафедра метрологии, приборостроения и управления качеством', 'structureUsers': 21 },
        { 'structureName': 'Кафедра материаловедения и технологии художественных изделий', 'structureUsers': 11 },
        { 'structureName': 'Кафедра транспортно-технологических процессов и машин', 'structureUsers': 3 },
      ]
    },
    {
      'faculty': 'Нефтегазовый факультет', 'name': 'Иванов', 'users': '92', 'structures': [
        { 'structureName': 'Кафедра разработки и эксплуатации нефтяных и газовых месторождений', 'structureUsers': 11 },
        { 'structureName': 'Кафедра транспорта и хранения нефти и газа', 'structureUsers': 21 },
        { 'structureName': 'Кафедра бурения скважин', 'structureUsers': 11 },
      ]
    },
    {
      'faculty': 'Факультет переработки минерального сырья', 'name': 'Петров', 'users': '132', 'structures': [
        { 'structureName': 'Кафедра строительства горных предприятий и подземных сооружений', 'structureUsers': 11 },
        { 'structureName': 'Кафедра маркшейдерского дела', 'structureUsers': 21 },
        { 'structureName': 'Кафедра инженерной геодезии', 'structureUsers': 11 },
        { 'structureName': 'Кафедра архитектуры', 'structureUsers': 3 },
        { 'structureName': 'Кафедра гидрогеологии и инженерной геологии', 'structureUsers': 1 },
        { 'structureName': 'Кафедра механики', 'structureUsers': 14 },
      ]
    }
  ]

  constructor() { }
}
