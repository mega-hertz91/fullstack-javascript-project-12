import { Container, ButtonGroup, Button } from "react-bootstrap";
import BaseLayout from "@/components/layout";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center h-screen mx-auto d-flex flex-column justify-content-center align-items-center h-100">
        <h1 className="text-4xl font-bold">{t("notFound.title")}</h1>
        <p className="mt-4 text-lg">{t("notFound.description")}</p>
        <ButtonGroup>
          <Button variant="primary" href="/">
            {t("notFound.backToHome")}
          </Button>
          {!isAuth && (
            <Button variant="secondary" href="/signup">
              {t("auth.signUp")}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </BaseLayout>
  );
}

export default Page;