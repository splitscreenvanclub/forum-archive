import { FC } from "react";
import styles from './LoadingIndicator.module.css';

const LoadingIndiciator: FC = () => {
  return (
    <div className={styles.liThreeBounce}>
      <div className={`${styles.liChild} ${styles.liBounce1}`}></div>
      <div className={`${styles.liChild} ${styles.liBounce2}`}></div>
      <div className={`${styles.liChild}`}></div>
    </div>
  );
}

export default LoadingIndiciator;