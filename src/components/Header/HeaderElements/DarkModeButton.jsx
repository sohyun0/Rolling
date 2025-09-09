import { useContext } from "react";
import { cn } from "../../../utils";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";
import { ThemeContext } from "../../../features/HeaderService/Context/ThemeContext";

/**
 * 다크모드 버튼을 표시하는 컴포넌트
 * @author hwitae
 * @returns 다크모드 버튼
 */
const DarkModeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      btnStyle="secondary"
      onClick={toggleTheme}
      aria-label="다크모드 토글 버튼"
      btnSize="btn-icon-40"
      className={cn("rounded-md")}
    >
      <Icon
        iconName={theme === "light" ? "darkMode" : "lightMode"}
        className="bg-purple-700"
      />
    </Button>
  );
};
export default DarkModeButton;
