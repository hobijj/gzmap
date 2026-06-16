import json
from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base


class DataItem(Base):
    __tablename__ = "data_items"

    id = Column(String, primary_key=True)  # 'housing', 'food', etc.
    module = Column(String, nullable=False)  # 'life', 'memory', 'pulse'
    name = Column(String, nullable=False)
    description = Column(Text)
    map_type = Column(String, nullable=False)  # 'heatmap' | 'scatter'
    chart_type = Column(String, nullable=False, default="bar")
    chart_title = Column(String)
    chart_x_field = Column(String, nullable=False, default="district")
    chart_y_field = Column(String, nullable=False, default="value")
    chart_unit = Column(String)

    points = relationship("MapPoint", back_populates="data_item", cascade="all, delete-orphan")
    regions = relationship("Region", back_populates="data_item", cascade="all, delete-orphan")
    stats = relationship("Stat", back_populates="data_item", cascade="all, delete-orphan")


class MapPoint(Base):
    __tablename__ = "map_points"
    __table_args__ = (UniqueConstraint("data_item_id", "name", "district"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    data_item_id = Column(String, ForeignKey("data_items.id", ondelete="CASCADE"), nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    value = Column(Float, nullable=False)
    name = Column(String, nullable=False)
    district = Column(String, nullable=False)
    extra_json = Column(Text, default="{}")  # JSON string for optional fields

    data_item = relationship("DataItem", back_populates="points")

    def get_extra(self):
        return json.loads(self.extra_json) if self.extra_json else {}


class Region(Base):
    __tablename__ = "regions"
    __table_args__ = (UniqueConstraint("data_item_id", "district"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    data_item_id = Column(String, ForeignKey("data_items.id", ondelete="CASCADE"), nullable=False)
    district = Column(String, nullable=False)
    value = Column(Float, nullable=False)

    data_item = relationship("DataItem", back_populates="regions")


class Stat(Base):
    __tablename__ = "stats"
    __table_args__ = (UniqueConstraint("data_item_id", "label"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    data_item_id = Column(String, ForeignKey("data_items.id", ondelete="CASCADE"), nullable=False)
    label = Column(String, nullable=False)
    value = Column(String, nullable=False)
    trend = Column(String, nullable=True)  # 'up', 'down', or null
    sort_order = Column(Integer, default=0)

    data_item = relationship("DataItem", back_populates="stats")
