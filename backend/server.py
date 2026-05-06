from __future__ import annotations

import json
import os
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlparse


PORT = int(os.getenv("BACKEND_PORT", "4000"))
CLIENT_ORIGIN = os.getenv("CLIENT_ORIGIN", "http://localhost:3000")
DATA_FILE = Path(os.getenv("BACKEND_DATA_FILE", Path(__file__).with_name("data.json")))


def create_initial_database() -> dict[str, Any]:
    demo_user = {
        "id": "user-1",
        "name": "Карас",
        "email": "demo@taskflow.local",
        "role": "owner",
        "avatarColor": "#206a5d",
        "position": "Product manager",
        "workspaceName": "TaskFlow Space",
        "notifications": {
            "deadlineReminders": True,
            "reviewUpdates": True,
            "dailyDigest": False,
        },
    }

    return {
        "demoUser": demo_user,
        "users": [
            demo_user,
            {
                "id": "user-2",
                "name": "Анна",
                "email": "anna@taskflow.local",
                "role": "manager",
                "avatarColor": "#b85c38",
                "position": "Design lead",
                "workspaceName": "TaskFlow Space",
                "notifications": {
                    "deadlineReminders": True,
                    "reviewUpdates": False,
                    "dailyDigest": True,
                },
            },
            {
                "id": "user-3",
                "name": "Илья",
                "email": "ilya@taskflow.local",
                "role": "member",
                "avatarColor": "#4d5f8f",
                "position": "Frontend developer",
                "workspaceName": "TaskFlow Space",
                "notifications": {
                    "deadlineReminders": True,
                    "reviewUpdates": True,
                    "dailyDigest": True,
                },
            },
        ],
        "projects": [
            {
                "id": "project-1",
                "name": "Запуск MVP",
                "description": "Подготовить минимальную версию task-manager к демонстрации.",
                "status": "active",
                "dueDate": "2026-05-12",
            },
            {
                "id": "project-2",
                "name": "Дизайн-система",
                "description": "Собрать UI-паттерны, цвета, типографику и состояния компонентов.",
                "status": "active",
                "dueDate": "2026-05-28",
            },
            {
                "id": "project-3",
                "name": "Командный отчет",
                "description": "Вывести метрики завершения задач и загрузки участников.",
                "status": "paused",
                "dueDate": "2026-06-10",
            },
        ],
        "tasks": [
            {
                "id": "task-1",
                "title": "Сверстать лендинг",
                "description": "SSR-страница с SEO, CTA и статистикой.",
                "status": "done",
                "priority": "high",
                "projectId": "project-1",
                "assigneeId": "user-1",
                "dueDate": "2026-04-24",
            },
            {
                "id": "task-2",
                "title": "Настроить store",
                "description": "Общий RootStore собирает auth, task, project и theme stores.",
                "status": "review",
                "priority": "high",
                "projectId": "project-1",
                "assigneeId": "user-1",
                "dueDate": "2026-04-26",
            },
            {
                "id": "task-3",
                "title": "Добавить календарь",
                "description": "Показать ближайшие задачи по дедлайнам.",
                "status": "inProgress",
                "priority": "medium",
                "projectId": "project-2",
                "assigneeId": "user-2",
                "dueDate": "2026-04-29",
            },
            {
                "id": "task-4",
                "title": "Подготовить API методы",
                "description": "GET, POST, PUT, PATCH, DELETE через axios-клиент.",
                "status": "todo",
                "priority": "medium",
                "projectId": "project-3",
                "assigneeId": "user-3",
                "dueDate": "2026-05-02",
            },
        ],
    }


def save_database() -> None:
    temp_file = DATA_FILE.with_suffix(".tmp")
    temp_file.write_text(json.dumps(database, ensure_ascii=False, indent=2), encoding="utf-8")
    temp_file.replace(DATA_FILE)


def load_database() -> dict[str, Any]:
    if not DATA_FILE.exists():
        initial_database = create_initial_database()
        DATA_FILE.write_text(json.dumps(initial_database, ensure_ascii=False, indent=2), encoding="utf-8")
        return initial_database

    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


database = load_database()


def create_id(prefix: str) -> str:
    return f"{prefix}-{int(time.time() * 1000):x}"


def find_by_id(items: list[dict[str, Any]], item_id: str) -> dict[str, Any] | None:
    return next((item for item in items if item["id"] == item_id), None)


def replace_by_id(items: list[dict[str, Any]], item_id: str, next_item: dict[str, Any]) -> dict[str, Any] | None:
    for index, item in enumerate(items):
        if item["id"] == item_id:
            items[index] = next_item
            return next_item
    return None


def remove_by_id(items: list[dict[str, Any]], item_id: str) -> dict[str, Any] | None:
    for index, item in enumerate(items):
        if item["id"] == item_id:
            return items.pop(index)
    return None


class TaskFlowHandler(BaseHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Access-Control-Allow-Credentials", "true")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
        self.send_header("Access-Control-Allow-Origin", CLIENT_ORIGIN)
        super().end_headers()

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_GET(self) -> None:
        self.handle_request()

    def do_POST(self) -> None:
        self.handle_request()

    def do_PUT(self) -> None:
        self.handle_request()

    def do_PATCH(self) -> None:
        self.handle_request()

    def do_DELETE(self) -> None:
        self.handle_request()

    def read_json(self) -> dict[str, Any]:
        content_length = int(self.headers.get("Content-Length", "0"))
        if content_length == 0:
            return {}

        raw_body = self.rfile.read(content_length).decode("utf-8")
        return json.loads(raw_body) if raw_body else {}

    def send_json(self, status_code: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_data(self, data: Any, message: str, status_code: int = HTTPStatus.OK) -> None:
        self.send_json(status_code, {"data": data, "message": message})

    def send_error(self, status_code: int, message: str) -> None:
        self.send_json(status_code, {"message": message, "status": status_code})

    def set_session_cookie(self) -> None:
        self.send_header("Set-Cookie", "task-manager-session=demo-session; Path=/; HttpOnly; SameSite=Lax")

    def clear_session_cookie(self) -> None:
        self.send_header("Set-Cookie", "task-manager-session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax")

    def handle_request(self) -> None:
        path = urlparse(self.path).path
        method = self.command

        try:
            self.route_request(method, path)
        except json.JSONDecodeError:
            self.send_error(HTTPStatus.BAD_REQUEST, "Invalid JSON body")
        except Exception as error:
            self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, str(error))

    def route_request(self, method: str, path: str) -> None:
        if method == "GET" and path == "/api/health":
            self.send_data({"ok": True}, "Backend is running")
            return

        if method == "POST" and path == "/api/auth/login":
            payload = self.read_json()
            if not payload.get("email") or not payload.get("password"):
                self.send_error(HTTPStatus.BAD_REQUEST, "Email and password are required")
                return

            self.send_response(HTTPStatus.OK)
            self.set_session_cookie()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(
                json.dumps(
                    {
                        "data": {"user": database["demoUser"], "token": "demo-token"},
                        "message": f"Logged in: {payload['email']}",
                    },
                    ensure_ascii=False,
                ).encode("utf-8")
            )
            return

        if method == "POST" and path == "/api/auth/register":
            payload = self.read_json()
            user = {
                "id": create_id("user"),
                "name": payload.get("name", ""),
                "email": payload.get("email", ""),
                "role": "owner",
                "avatarColor": "#206a5d",
                "position": "Workspace owner",
                "workspaceName": "TaskFlow Space",
                "notifications": {
                    "deadlineReminders": True,
                    "reviewUpdates": True,
                    "dailyDigest": False,
                },
            }
            database["demoUser"] = user
            database["users"].insert(0, user)
            save_database()

            self.send_response(HTTPStatus.CREATED)
            self.set_session_cookie()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(
                json.dumps({"data": {"user": user, "token": "demo-token"}, "message": "Registration completed"}, ensure_ascii=False).encode("utf-8")
            )
            return

        if method == "POST" and path == "/api/auth/logout":
            self.send_response(HTTPStatus.OK)
            self.clear_session_cookie()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps({"data": True, "message": "Logged out"}).encode("utf-8"))
            return

        if method == "GET" and path == "/api/profile":
            self.send_data(database["demoUser"], "Profile loaded")
            return

        if method == "PATCH" and path == "/api/profile":
            payload = self.read_json()
            database["demoUser"] = {**database["demoUser"], **payload}
            replace_by_id(database["users"], database["demoUser"]["id"], database["demoUser"])
            save_database()
            self.send_data(database["demoUser"], "Profile updated")
            return

        if path == "/api/tasks":
            self.handle_collection(
                method=method,
                items=database["tasks"],
                id_prefix="task",
                get_message="Tasks loaded",
                create_message="Task created",
            )
            return

        if path.startswith("/api/tasks/"):
            self.handle_item(
                method=method,
                items=database["tasks"],
                item_id=path.removeprefix("/api/tasks/"),
                not_found_message="Task not found",
                replace_message="Task replaced",
                update_message="Task updated",
                delete_message="Task deleted",
            )
            return

        if path == "/api/projects":
            self.handle_collection(
                method=method,
                items=database["projects"],
                id_prefix="project",
                get_message="Projects loaded",
                create_message="Project created",
            )
            return

        if path.startswith("/api/projects/"):
            self.handle_item(
                method=method,
                items=database["projects"],
                item_id=path.removeprefix("/api/projects/"),
                not_found_message="Project not found",
                replace_message="Project replaced",
                update_message="Project updated",
                delete_message="Project deleted",
            )
            return

        if method == "GET" and path == "/api/team":
            self.send_data(database["users"], "Team loaded")
            return

        if method == "POST" and path == "/api/team":
            payload = self.read_json()
            member = {
                "id": create_id("user"),
                "workspaceName": database["demoUser"]["workspaceName"],
                "notifications": {
                    "deadlineReminders": True,
                    "reviewUpdates": False,
                    "dailyDigest": False,
                },
                **payload,
            }
            database["users"].append(member)
            save_database()
            self.send_data(member, "Team member created", HTTPStatus.CREATED)
            return

        if path.startswith("/api/team/"):
            self.handle_team_item(method, path.removeprefix("/api/team/"))
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Route not found")

    def handle_collection(self, method: str, items: list[dict[str, Any]], id_prefix: str, get_message: str, create_message: str) -> None:
        if method == "GET":
            self.send_data(items, get_message)
            return

        if method == "POST":
            payload = self.read_json()
            item = {"id": create_id(id_prefix), **payload}
            items.insert(0, item)
            save_database()
            self.send_data(item, create_message, HTTPStatus.CREATED)
            return

        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "Method not allowed")

    def handle_item(
        self,
        method: str,
        items: list[dict[str, Any]],
        item_id: str,
        not_found_message: str,
        replace_message: str,
        update_message: str,
        delete_message: str,
    ) -> None:
        item = find_by_id(items, item_id)
        if item is None:
            self.send_error(HTTPStatus.NOT_FOUND, not_found_message)
            return

        if method == "PUT":
            payload = self.read_json()
            next_item = replace_by_id(items, item_id, {"id": item_id, **payload})
            save_database()
            self.send_data(next_item, replace_message)
            return

        if method == "PATCH":
            payload = self.read_json()
            next_item = replace_by_id(items, item_id, {**item, **payload})
            save_database()
            self.send_data(next_item, update_message)
            return

        if method == "DELETE":
            deleted_item = remove_by_id(items, item_id)
            save_database()
            self.send_data(deleted_item["id"], delete_message)
            return

        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "Method not allowed")

    def handle_team_item(self, method: str, member_id: str) -> None:
        member = find_by_id(database["users"], member_id)

        if member is None:
            self.send_error(HTTPStatus.NOT_FOUND, "Team member not found")
            return

        if method == "PATCH":
            payload = self.read_json()
            next_member = replace_by_id(database["users"], member_id, {**member, **payload})
            save_database()
            self.send_data(next_member, "Team member updated")
            return

        if method == "DELETE":
            if member["role"] == "owner":
                self.send_error(HTTPStatus.FORBIDDEN, "Owner cannot be deleted")
                return

            deleted_member = remove_by_id(database["users"], member_id)
            save_database()
            self.send_data(deleted_member["id"], "Team member deleted")
            return

        self.send_error(HTTPStatus.METHOD_NOT_ALLOWED, "Method not allowed")

    def log_message(self, format: str, *args: Any) -> None:
        print(f"{self.address_string()} - {format % args}")


class TaskFlowServer(ThreadingHTTPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    server = TaskFlowServer(("0.0.0.0", PORT), TaskFlowHandler)
    print(f"TaskFlow backend is running at http://localhost:{PORT}")
    server.serve_forever()
