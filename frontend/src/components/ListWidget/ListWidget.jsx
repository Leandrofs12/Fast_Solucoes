import { useNavigate } from 'react-router-dom';
import styles from './ListWidget.module.css';

const ListWidget = ({ title, icon, items, renderItem, emptyText, route }) => {
    const navigate = useNavigate();

    const ultimos = [...items].slice(-4).reverse();

    return (
        <div className={styles.display}>
            <div className={styles.displayHeader}>
                <h2>{title}</h2>
                <span className={styles.displayBadge}>{items.length}</span>
            </div>

            <div className={styles.displayBody}>
                {ultimos.length === 0 ? (
                    <div className={styles.displayEmpty}>
                        <span className="material-symbols-rounded">{icon}</span>
                        {emptyText}
                    </div>
                ) : (
                    <div className={styles.list}>
                        {ultimos.map((item, index) => (
                            <div key={index} className={styles.listItem}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}

                <button className={styles.btnVer} onClick={() => navigate(route)}>
                    Ver todos
                    <span className="material-symbols-rounded">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default ListWidget;