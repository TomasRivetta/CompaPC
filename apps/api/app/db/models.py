from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Float, ForeignKey, Integer, String, Text


class Base(DeclarativeBase):
    pass


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    store: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    external_id: Mapped[int | None] = mapped_column(Integer, nullable=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    group_external_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    image: Mapped[str | None] = mapped_column(String(255), nullable=True)
    hidden_keywords: Mapped[str | None] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int | None] = mapped_column(Integer, nullable=True)


class ProductOffer(Base):
    __tablename__ = "product_offers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    store: Mapped[str] = mapped_column(String(100), nullable=False)
    external_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    normalized_title: Mapped[str] = mapped_column(String(500), nullable=False)
    price: Mapped[float | None] = mapped_column(Float, nullable=True)
    price_list: Mapped[float | None] = mapped_column(Float, nullable=True)
    stock: Mapped[int] = mapped_column(Integer, default=0)
    category_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("categories.id"), nullable=True, index=True
    )
    category: Mapped[str | None] = mapped_column(String(255), nullable=True)
    marca: Mapped[str | None] = mapped_column(String(255), nullable=True)
    url: Mapped[str] = mapped_column(String(1000), nullable=False)
    image: Mapped[str | None] = mapped_column(String(1000), nullable=True)
