"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Task } from "@share/model/task";
import { useRootStore } from "@share/providers/store-provider";

type CalendarPlannerProps = {
  initialTasks: Task[];
};

type CalendarDay = {
  date: Date;
  isoDate: string;
  label: string;
  tasks: Task[];
};

const baseDate = new Date("2026-04-21T00:00:00");

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + days);
  return nextDate;
}

function formatDay(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  }).format(date);
}

function getPriorityRank(task: Task): number {
  const ranks: Record<Task["priority"], number> = {
    high: 0,
    medium: 1,
    low: 2
  };

  return ranks[task.priority];
}

function getTasksByDate(tasks: Task[], date: string): Task[] {
  return tasks.filter((task) => task.dueDate === date).sort((first, second) => getPriorityRank(first) - getPriorityRank(second));
}

function getPriorityLabel(task: Task): string {
  const labels: Record<Task["priority"], string> = {
    high: "Высокий",
    medium: "Средний",
    low: "Низкий"
  };

  return labels[task.priority];
}

export const CalendarPlanner = observer(function CalendarPlanner({ initialTasks }: CalendarPlannerProps): JSX.Element {
  const { taskStore } = useRootStore();
  const visibleTasks = taskStore.tasks.length > 0 ? taskStore.tasks : initialTasks;

  useEffect(() => {
    taskStore.hydrate(initialTasks);
    void taskStore.loadTasks();
  }, [initialTasks, taskStore]);

  const calendarDays: CalendarDay[] = Array.from({ length: 14 }, (_item, index) => {
    const date = addDays(baseDate, index);
    const isoDate = toIsoDate(date);

    return {
      date,
      isoDate,
      label: formatDay(date),
      tasks: getTasksByDate(visibleTasks, isoDate)
    };
  });
  const todayTasks = getTasksByDate(visibleTasks, toIsoDate(baseDate));
  const nextTask = [...visibleTasks]
    .filter((task) => task.dueDate >= toIsoDate(baseDate) && task.status !== "done")
    .sort((first, second) => first.dueDate.localeCompare(second.dueDate))[0];
  const overdueTasks = visibleTasks.filter((task) => task.dueDate < toIsoDate(baseDate) && task.status !== "done");
  const plannedTasks = calendarDays.reduce((total, day) => total + day.tasks.length, 0);

  return (
    <div className="calendar-layout">
      <section className="calendar-board" aria-label="Календарь задач">
        {calendarDays.map((day) => (
          <article className={day.isoDate === toIsoDate(baseDate) ? "calendar-day today" : "calendar-day"} key={day.isoDate}>
            <header>
              <strong>{day.label}</strong>
              <span className="muted">{day.isoDate}</span>
            </header>
            {day.tasks.length > 0 ? (
              <div className="day-tasks">
                {day.tasks.map((task) => (
                  <div className={`calendar-task priority-${task.priority}`} key={task.id}>
                    <span>{task.title}</span>
                    <small>{getPriorityLabel(task)} приоритет</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted empty-day">Нет дедлайнов</p>
            )}
          </article>
        ))}
      </section>
      <aside className="calendar-summary">
        <article className="card">
          <h3>Сегодня</h3>
          <strong>{todayTasks.length}</strong>
          <p className="muted">задач с дедлайном на сегодня</p>
        </article>
        <article className="card">
          <h3>В плане</h3>
          <strong>{plannedTasks}</strong>
          <p className="muted">дедлайнов в ближайшие 14 дней</p>
        </article>
        <article className="card">
          <h3>Просрочено</h3>
          <strong>{overdueTasks.length}</strong>
          <p className="muted">незавершенных задач раньше сегодняшней даты</p>
        </article>
        <article className="card focus-card">
          <h3>Следующий фокус</h3>
          {nextTask ? (
            <>
              <span className="badge">{nextTask.dueDate}</span>
              <p>{nextTask.title}</p>
              <p className="muted">{nextTask.description}</p>
            </>
          ) : (
            <p className="muted">Нет активных дедлайнов.</p>
          )}
        </article>
      </aside>
    </div>
  );
});
