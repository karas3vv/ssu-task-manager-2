"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Task } from "@share/model/task";
import { Locale } from "@share/config/i18n";
import { getTaskPriorityLabels } from "@share/lib/display-labels";
import { messages } from "@share/i18n/messages";
import { useRootStore } from "@share/providers/store-provider";

type CalendarPlannerProps = {
  initialTasks: Task[];
  locale: Locale;
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

function formatDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
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

export const CalendarPlanner = observer(function CalendarPlanner({ initialTasks, locale }: CalendarPlannerProps): JSX.Element {
  const { taskStore } = useRootStore();
  const t = messages[locale];
  const taskPriorityLabels = getTaskPriorityLabels(locale);
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
      label: formatDay(date, locale),
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
      <section className="calendar-board" aria-label={t.calendarBoard.boardLabel}>
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
                    <small>{taskPriorityLabels[task.priority]} {t.calendarBoard.prioritySuffix}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted empty-day">{t.calendarBoard.noDeadlines}</p>
            )}
          </article>
        ))}
      </section>
      <aside className="calendar-summary">
        <article className="card">
          <h3>{t.calendarBoard.today}</h3>
          <strong>{todayTasks.length}</strong>
          <p className="muted">{t.calendarBoard.todayText}</p>
        </article>
        <article className="card">
          <h3>{t.calendarBoard.planned}</h3>
          <strong>{plannedTasks}</strong>
          <p className="muted">{t.calendarBoard.plannedText}</p>
        </article>
        <article className="card">
          <h3>{t.calendarBoard.overdue}</h3>
          <strong>{overdueTasks.length}</strong>
          <p className="muted">{t.calendarBoard.overdueText}</p>
        </article>
        <article className="card focus-card">
          <h3>{t.calendarBoard.nextFocus}</h3>
          {nextTask ? (
            <>
              <span className="badge">{nextTask.dueDate}</span>
              <p>{nextTask.title}</p>
              <p className="muted">{nextTask.description}</p>
            </>
          ) : (
            <p className="muted">{t.calendarBoard.noActiveDeadlines}</p>
          )}
        </article>
      </aside>
    </div>
  );
});
