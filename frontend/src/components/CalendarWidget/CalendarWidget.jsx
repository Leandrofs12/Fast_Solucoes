import { useState, useEffect } from 'react';
import styles from './CalendarWidget.module.css';

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const DOW = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const keyOf = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

const CalendarWidget = () => {
    const [current, setCurrent] = useState(new Date());
    const [selected, setSelected] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('compromissos');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('compromissos', JSON.stringify(events));
    }, [events]);

    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const selectDay = (day) => {
        setSelected(new Date(year, month, day));
    };

    const changeMonth = (delta) => {
        setCurrent(new Date(year, month + delta, 1));
    };

    const addEvent = () => {
        const text = inputValue.trim();
        if (!text) return;
        const k = keyOf(selected);
        setEvents(prev => ({
            ...prev,
            [k]: [...(prev[k] || []), text]
        }));
        setInputValue('');
    };

    const removeEvent = (index) => {
        const k = keyOf(selected);
        setEvents(prev => {
            const updated = [...prev[k]];
            updated.splice(index, 1);
            const novo = { ...prev };
            if (updated.length === 0) {
                delete novo[k];
            } else {
                novo[k] = updated;
            }
            return novo;
        });
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') addEvent();
    };

    const eventosdo_dia = events[keyOf(selected)] || [];

    const dias = [];
    for (let i = 0; i < firstDay; i++) {
        dias.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        dias.push(day);
    }

    return (
        <div className={styles.widget}>
            <div className={styles.left}>
                <div className={styles.header}>
                    <div className={styles.month}>{MESES[month]} {year}</div>
                    <div className={styles.nav}>
                        <button onClick={() => changeMonth(-1)}>
                            <span className="material-symbols-rounded">chevron_left</span>
                        </button>
                        <button onClick={() => changeMonth(1)}>
                            <span className="material-symbols-rounded">chevron_right</span>
                        </button>
                    </div>
                </div>

                <div className={styles.grid}>
                    {DOW.map((d) => (
                        <div key={d} className={styles.dow}>{d}</div>
                    ))}

                    {dias.map((day, index) => {
                        if (day === null) {
                            return <div key={`empty-${index}`} className={`${styles.day} ${styles.empty}`} />;
                        }
                        const d = new Date(year, month, day);
                        const k = keyOf(d);
                        const isSelected = keyOf(selected) === k;
                        const hasEvent = events[k] && events[k].length > 0;
                        return (
                            <div
                                key={day}
                                className={`${styles.day} ${isSelected ? styles.selected : ''} ${hasEvent ? styles.hasEvent : ''}`}
                                onClick={() => selectDay(day)}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.rightTitle}>Compromissos</div>
                <div className={styles.rightDate}>
                    {selected.getDate()} de {MESES[selected.getMonth()]}
                </div>

                <div className={styles.add}>
                    <input
                        type="text"
                        placeholder="Novo compromisso..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    <button onClick={addEvent}>
                        <span className="material-symbols-rounded">add</span>
                    </button>
                </div>

                <div className={styles.events}>
                    {eventosdo_dia.length === 0 ? (
                        <div className={styles.emptyState}>
                            <span className="material-symbols-rounded">event_available</span>
                            Nenhum compromisso
                        </div>
                    ) : (
                        eventosdo_dia.map((ev, i) => (
                            <div key={i} className={styles.event}>
                                <span>{ev}</span>
                                <button onClick={() => removeEvent(i)}>
                                    <span className="material-symbols-rounded">close</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarWidget;