import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './DespesaChart.module.css';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const DespesaChart = ({ despesas = [] }) => {
    const [view, setView] = useState('mes');

    // Agrupa as despesas por mês
    const dadosPorMes = useMemo(() => {
        const acc = {};
        despesas.forEach((d) => {
            if (!d.data) return;
            const dataLimpa = d.data.split('T')[0]; // pega só YYYY-MM-DD
            const mesIndex = parseInt(dataLimpa.split('-')[1], 10) - 1;
            const label = MESES[mesIndex];
            acc[label] = (acc[label] || 0) + Number(d.valor || 0);
        });
        // mantém a ordem dos meses
        return MESES
            .filter((m) => acc[m] !== undefined)
            .map((m) => ({ label: m, valor: acc[m] }));
    }, [despesas]);

    // Agrupa as despesas por tipo
    const dadosPorTipo = useMemo(() => {
        const acc = {};
        despesas.forEach((d) => {
            const tipo = d.tipo_despesa || 'Outros';
            acc[tipo] = (acc[tipo] || 0) + Number(d.valor || 0);
        });
        return Object.entries(acc).map(([label, valor]) => ({ label, valor }));
    }, [despesas]);

    const dados = view === 'mes' ? dadosPorMes : dadosPorTipo;

    const formatBRL = (v) =>
        v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <div className={styles.dash}>
            <div className={styles.head}>
                <div className={styles.title}>
                    {view === 'mes' ? 'Despesas por Mês' : 'Despesas por Tipo'}
                </div>
                <div className={styles.toggle}>
                    <button
                        className={view === 'mes' ? styles.active : ''}
                        onClick={() => setView('mes')}
                    >
                        Por Mês
                    </button>
                    <button
                        className={view === 'tipo' ? styles.active : ''}
                        onClick={() => setView('tipo')}
                    >
                        Por Tipo
                    </button>
                </div>
            </div>

            {dados.length === 0 ? (
                <div className={styles.empty}>
                    <span className="material-symbols-rounded">bar_chart</span>
                    Nenhuma despesa registrada
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={dados} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tick={{ fontSize: 12, fill: '#888' }}
                            axisLine={{ stroke: '#eee' }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: '#bbb' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `R$ ${v}`}
                        />
                        <Tooltip
                            formatter={(v) => formatBRL(v)}
                            cursor={{ fill: 'rgba(41, 128, 185, 0.08)' }}
                            contentStyle={{
                                borderRadius: 8,
                                border: '1px solid #e0e0e0',
                                fontSize: 13,
                            }}
                        />
                        <Bar dataKey="valor" fill="#2980b9" radius={[6, 6, 0, 0]} maxBarSize={48} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default DespesaChart;