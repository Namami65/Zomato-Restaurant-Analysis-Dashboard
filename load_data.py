import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv("../database/zomato_bangalore.csv")

df = df.drop(columns=["Unnamed: 0.1", "Unnamed: 0"])

df = df.rename(columns={
    "restaurant name": "restaurant_name",
    "restaurant type": "restaurant_type",
    "rate (out of 5)": "rating",
    "num of ratings": "num_of_ratings",
    "avg cost (two people)": "avg_cost_two_people",
    "table booking": "table_booking",
    "cuisines type": "cuisines_type",
    "local address": "local_address"
})

engine = create_engine("postgresql+psycopg2://postgres:pass8287@localhost:5432/zomato")

df.to_sql("restaurants", engine, if_exists="append", index=False)

print("Data loaded successfully:", len(df), "rows inserted")