import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";

// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Victory Native
import { VictoryPie } from "victory-native";

// Responsive Font Size
import { RFValue } from "react-native-responsive-fontsize";

// Styled Components Theme
import { useTheme } from "styled-components";

// React Navigation Bottom Tabs
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Date Fns
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

//Components
import { HistoryCard } from "../../components/HistoryCard";

// Context
import { useAuth } from "../../hooks/auth";

// Interface
import { TransactionCardProps } from "../../components/TransactionCard";
//  type: "positive" | "negative"; name: string; amount: string; category: string; date: string;

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

// Local
import { categories } from "../../utils/categories";

//CSS
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";

export function Resume() {
  // States
  const [isLoading, setisLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState(
    [] as CategoryData[]
  );

  // Context
  const { user } = useAuth();

  // Styled Components Theme
  const theme = useTheme();

  // Function to change the month
  function handleDateChange(action: "next" | "prev") {
    if (action === "next") setSelectedDate(addMonths(selectedDate, 1));
    else setSelectedDate(subMonths(selectedDate, 1));
  }

  // Function to load data from Async Storage
  async function loadData() {
    setisLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionCardProps) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensiveTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionCardProps) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = (categorySum / expensiveTotal) * 100;
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          color: category.color,
          key: category.key,
          percent,
          percentFormatted,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setisLoading(false);
  }

  // Load data when the screen is loaded
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  // Return
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
          showsVerticalScrollIndicator={false}>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              x="percentFormatted"
              y="total"
            />
          </ChartContainer>
          {totalByCategories.map((item) => {
            return (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            );
          })}
        </Content>
      )}
    </Container>
  );
}
