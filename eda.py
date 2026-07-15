import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sqlalchemy import create_engine
import os

engine = create_engine("postgresql+psycopg2://postgres:pass8287@localhost:5432/zomato")
df = pd.read_sql("SELECT * FROM restaurants", engine)

print(df.head())
print(df.shape)

sns.set_style("whitegrid")
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = 'white'
plt.rcParams['axes.edgecolor'] = '#8b0000'
plt.rcParams['text.color'] = '#8b0000'
plt.rcParams['axes.labelcolor'] = '#8b0000'
plt.rcParams['xtick.color'] = '#8b0000'
plt.rcParams['ytick.color'] = '#8b0000'
RED = '#c0392b'
DARK_RED = '#8b0000'

os.makedirs("static/images", exist_ok=True)

# Analysis 1: Kis area mein sabse zyada/kam restaurants hain
area_counts = df['area'].value_counts().head(15)

plt.figure(figsize=(10, 7))
sns.barplot(x=area_counts.values, y=area_counts.index, color=RED, edgecolor=DARK_RED)
plt.title("Top 15 Areas by Number of Restaurants", fontsize=14, fontweight='bold', color=DARK_RED)
plt.xlabel("Number of Restaurants")
plt.ylabel("Area")
plt.tight_layout()
plt.savefig("static/images/area_wise_restaurant_count.png", dpi=150, facecolor='white')
plt.close()

# Analysis 2: Online order walo ki rating offline se better hai kya
online_rating = df.groupby('online_order')['rating'].mean().reset_index()
print(online_rating)

plt.figure(figsize=(7, 6))
sns.boxplot(x='online_order', y='rating', data=df, palette=[RED, DARK_RED])
plt.title("Rating Comparison: Online Order vs No Online Order", fontsize=14, fontweight='bold', color=DARK_RED)
plt.xlabel("Online Order Available")
plt.ylabel("Rating (out of 5)")
plt.tight_layout()
plt.savefig("static/images/online_order_vs_rating.png", dpi=150, facecolor='white')
plt.close()

# Analysis 3: 2 person food cost kis area mein sabse kam hai
avg_cost_by_area = df.groupby('area')['avg_cost_two_people'].mean().sort_values().head(15)

plt.figure(figsize=(10, 7))
sns.barplot(x=avg_cost_by_area.values, y=avg_cost_by_area.index, color=RED, edgecolor=DARK_RED)
plt.title("Top 15 Cheapest Areas (Avg Cost for Two People)", fontsize=14, fontweight='bold', color=DARK_RED)
plt.xlabel("Average Cost for Two (Rs)")
plt.ylabel("Area")
plt.tight_layout()
plt.savefig("static/images/cheapest_areas_avg_cost.png", dpi=150, facecolor='white')
plt.close()

print("Done. Charts saved in static/images folder:")
print(os.listdir("static/images"))