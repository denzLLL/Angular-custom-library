# Создаем библиотеку под Angular, публикуем в npm (verdaccio, public npm)


## Устанавливаем библиотеку

В папке проекта выполним команду на создание библиотеки:

> ng generate library my-lib

my-lib - название библ-ки

Появится папка ```projects``` с ```my-lib```


## Начинаем использовать библиотеку

```\projects\my-lib\src\public-api.ts``` - определяет, что доступно потребителям библиотеки.

В ```tsconfig.json``` мы автоматом увидим (см. ниже) - алиас** к my-lib и путь к скомпилированным файлам*. 

```
"paths": {
    "my-lib": [
        "dist/my-lib"
    ]
},
```


Чтобы собрать нашу библиотеку*:
```
ng build my-lib
```

Используем в проекте (подключаем в AppModule):

```
import {MyLibModule} from 'my-lib'; // доступ через алиас**

@NgModule({
    imports: [
        MyLibModule
    ],
})
export class AppModule {
}

```

Далее мы можем использовать компоненты библ-ки (app.component.html):
```
<lib-my-lib></lib-my-lib>
```

### Подхватываем изменения на лету
```
ng build my-lib --watch
```

В нашем примере необходимо выполнить команды:
> npm run w \
> npm run start


## Используем  библиотеку в Mono-Repo и в Different Workspaces

### в Mono-Repo
Создадим приложение users в нашем приложении 
(команду запустим в \my-first-library\ и приложение ```users``` будет добавлено в папку projects):
>  ng g application users

Запустим users:
ng serve users --port 4201

Подключим также MyLibModule в приложении users
Монорепозиторий имеет один и тот же репозиторий, со структурой, кот мы реализовали выше:
в папке projects мы имеем подпапки с библиотекой my-lib и прилож users

### в Different Workspaces 

Указываем правильный путь в:
```
"paths": {
    "@angular/*"  : ["./node_modules/@angular/*"],
    "my-lib": ["../client1/dist/my-lib"]
},
```

## Приватный NPM пакет используя Verdaccio (polyrepo)

Первый путь расшарить библ это npm registry.
Второй путь это ```Verdaccio``` - private npm proxy registry

> npm i verdaccio -g
> verdaccio --help

1. Стартуем сервер (http://localhost:4873/) verdaccio:
> verdaccio

2. Далее выполним команды предоставленные сервером. Добавим юзера:
> npm adduser --registry http://localhost:4873/

3. Проверим, что мы залогинены:
> npm whoami --registry http://localhost:4873/

4. Подготовим библиотеку:
>  ng build my-lib

5. Далее в папке (```my-first-library\dist\my-lib```) выполним команду, кот опубликует библиотеку:
> npm publish --registry http://localhost:4873/

6. Далее по пути ```http://localhost:4873/``` вы найдете свою библ-ку, с инстр-й по установке и т.д.

7. Чтобы установить эту библиотеку (в стороннем проекте) через private npm proxy registry, создадим файл ```.npmrc```
со следующим содержимым:
> registry=http://localhost:4873

8. И установим нашу библ-ку:
> npm install denz-lib

9. Используем в проекте.


## Публикация в публичном NPM 

Залогинимся в npm (в терминале):
> npm add user

Чтобы удостовериться, что вы залогинены:
> npm whoami

4. Подготовим библиотеку:
>  ng build my-lib

5. Публикуем
> cd dist/my-lib
> npm publish


За деталями можно пойти на сайт npm - https://www.npmjs.com :
> npm -> packages

### Unpublish
Конкретной версии:
> npm unpublish denz-lib@0.0.2


























