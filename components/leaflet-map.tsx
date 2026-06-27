"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── How to add a location ──────────────────────────────────────────────────
// 1. Open Google Maps, right-click the spot → "What's here?" to get lat/lng.
// 2. Add an entry to the places array below.
// 3. Types: "home" | "work" | "college" | "cafe" | "other"
// ──────────────────────────────────────────────────────────────────────────
export const places: Place[] = [
    {
        name: "Home",
        lat: 13.024809397604123,
        lng: 80.25602097021695,
        type: "home",
        emoji: "🏠",
        note: "Where I live.",
    },
    {
        name: "VIT Chennai",
        lat: 12.842930771374693,
        lng: 80.15527327339531,
        type: "college",
        emoji: "🎓",
        note: "4 years. Countless all-nighters.",
    },
    {
        name: "Fidelity Investments",
        lat: 12.983724737785444,
        lng: 80.2477422609933,
        type: "work",
        emoji: "💼",
        note: "First enterprise internship.",
    },
    {
        name: "HealthPilot.ai",
        lat: 13.057562313549637,
        lng: 80.24213974612324,
        type: "work",
        emoji: "🏥",
        note: "Business development & go-to-market.",
    },
    {
        name: "Time Cafe",
        lat: 13.058366101524179,
        lng: 80.24255264229856,
        type: "cafe",
        emoji: "☕",
        note: "Must try onion rings",
    },
    {
        name: "Chettinad Vidyashram",
        lat: 13.016564749502754,
        lng: 80.26768478330933,
        type: "school",
        emoji: "🏫",
        note: "Where it all began",
    },
];

export interface Place {
    name: string;
    lat: number;
    lng: number;
    type: "home" | "work" | "college" | "cafe" | "other" | "school";
    emoji: string;
    note: string;
}

const typeColor: Record<Place["type"], string> = {
    home: "#3b82f6",
    work: "#10b981",
    college: "#8b5cf6",
    school: "#f59e0b",
    cafe: "#f59e0b",
    other: "#6b7280",
};

function markerIcon(place: Place) {
    return L.divIcon({
        html: `<div style="
            background: white;
            border: 2.5px solid ${typeColor[place.type]};
            border-radius: 50%;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.25);
        ">${place.emoji}</div>`,
        className: "",
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -22],
    });
}

interface LeafletMapProps {
    isDark: boolean;
}

export default function LeafletMap({ isDark }: LeafletMapProps) {
    const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    return (
        <MapContainer
            center={[12.9352, 80.2100]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            zoomControl
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url={tileUrl}
            />
            {places.map((place) => (
                <Marker
                    key={place.name}
                    position={[place.lat, place.lng]}
                    icon={markerIcon(place)}
                >
                    <Popup>
                        <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
                            <strong>{place.emoji} {place.name}</strong>
                            <br />
                            <span style={{ color: "#888" }}>{place.note}</span>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
