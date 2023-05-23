import styles from "./../styles.module.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboard}>
      <p>Layout For Dashboard</p>
      {children}
    </div>
  );
};
export default layout;
