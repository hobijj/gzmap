from pydantic import BaseModel
from typing import List, Optional, Any


class StatOut(BaseModel):
    label: str
    value: str
    trend: Optional[str] = None

    class Config:
        from_attributes = True


class RegionOut(BaseModel):
    district: str
    value: float

    class Config:
        from_attributes = True


class PointOut(BaseModel):
    lat: float
    lng: float
    value: float
    name: str
    district: str
    # Optional extra fields (merged from extra_json)
    category: Optional[str] = None
    type: Optional[str] = None
    history: Optional[str] = None
    era: Optional[str] = None
    area: Optional[str] = None
    line: Optional[str] = None
    scale: Optional[str] = None
    peak: Optional[str] = None

    class Config:
        from_attributes = True


class MapDataOut(BaseModel):
    type: str
    points: List[PointOut]
    regions: List[RegionOut]

    class Config:
        from_attributes = True


class ChartConfigOut(BaseModel):
    type: str
    title: str
    xField: str
    yField: str
    unit: str

    class Config:
        from_attributes = True


class SubItemOut(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    mapData: MapDataOut
    chartData: ChartConfigOut
    stats: List[StatOut]

    class Config:
        from_attributes = True
