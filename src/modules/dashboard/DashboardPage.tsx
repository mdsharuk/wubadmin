import { CSSProperties } from "react";
import { FiAward, FiBookOpen, FiFileText, FiGlobe, FiHome, FiInbox, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";

interface StatCard {
  label: string;
  value: number;
  icon: JSX.Element;
  tone: string;
  toneBg: string;
}

const stats: StatCard[] = [
  {
    label: "Universities",
    value: 3,
    icon: <FiAward />,
    tone: "#2f80ed",
    toneBg: "#e8f0fe",
  },
  {
    label: "Courses",
    value: 2,
    icon: <FiBookOpen />,
    tone: "#7264f4",
    toneBg: "#eeecfe",
  },
  {
    label: "Students",
    value: 2,
    icon: <FiUsers />,
    tone: "#0f9d58",
    toneBg: "#e6f7ef",
  },
  {
    label: "Leads",
    value: 3,
    icon: <FiInbox />,
    tone: "#e08a1e",
    toneBg: "#fdf3e0",
  },
  {
    label: "Education Agencies",
    value: 2,
    icon: <FiHome />,
    tone: "#7c5cf4",
    toneBg: "#eeecfe",
  },
];

interface RankingSource {
  initials: string;
  name: string;
  meta: string;
  rank: string;
  tone: string;
  toneBg: string;
}

const rankingSources: RankingSource[] = [
  {
    initials: "QS",
    name: "QS",
    meta: "QS World University Rankings · 2027",
    rank: "#4",
    tone: "#2f80ed",
    toneBg: "#e8f0fe",
  },
  {
    initials: "THE",
    name: "Times Higher Education",
    meta: "World University Rankings · 2026",
    rank: "#1",
    tone: "#0f9d58",
    toneBg: "#e6f7ef",
  },
  {
    initials: "ARWU",
    name: "ShanghaiRanking",
    meta: "ARWU · 2026",
    rank: "#7",
    tone: "#e08a1e",
    toneBg: "#fdf3e0",
  },
  {
    initials: "USN",
    name: "U.S. News",
    meta: "Best Global Universities · 2026–2027",
    rank: "#4",
    tone: "#7c5cf4",
    toneBg: "#eeecfe",
  },
];

interface Shortcut {
  icon: JSX.Element;
  name: string;
  desc: string;
  to: string;
}

const shortcuts: Shortcut[] = [
  {
    icon: <FiBookOpen />,
    name: "New University",
    desc: "Open the new university form",
    to: "/universities/create",
  },
  {
    icon: <FiUsers />,
    name: "Create New Student",
    desc: "Open the create new student form",
    to: "/students/create",
  },
  {
    icon: <FiFileText />,
    name: "New Blog Post",
    desc: "Open the new blog post form",
    to: "/blog/create",
  },
  {
    icon: <FiGlobe />,
    name: "New Country Page",
    desc: "Open the new country page form",
    to: "/pages/country/create",
  },
];

interface UniversityRecord {
  university: string;
  country: string;
  city: string;
  status: "Published" | "Draft";
}

const statusVariant: Record<UniversityRecord["status"], StatusPillVariant> = {
  Published: "success",
  Draft: "default",
};

const universityRecords: UniversityRecord[] = [
  {
    university: "Harvard University",
    country: "United States",
    city: "Cambridge",
    status: "Published",
  },
  {
    university: "University of Oxford",
    country: "United Kingdom",
    city: "Oxford",
    status: "Published",
  },
  {
    university: "Example University",
    country: "Canada",
    city: "Toronto",
    status: "Draft",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb />

      <div className="dash-stats">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="dash-stat"
            style={
              {
                "--stat-tone": stat.tone,
                "--stat-tone-bg": stat.toneBg,
              } as CSSProperties
            }
          >
            <span className="dash-stat__icon">{stat.icon}</span>
            <div className="dash-stat__label">{stat.label}</div>
            <div className="dash-stat__value">{stat.value}</div>
            <div className="dash-stat__hint">Records in this UI preview</div>
          </div>
        ))}
      </div>

      <div className="dash-row">
        <div className="dash-card">
          <div className="dash-card__head">
            <div>
              <div className="dash-card__title">Oxford ranking sources</div>
              <div className="dash-card__subtitle">
                Publisher and edition stay with every ranking
              </div>
            </div>
            <span className="dash-card__badge">4 publishers</span>
          </div>

          {rankingSources.map((source) => (
            <div key={source.name} className="dash-source">
              <span
                className="dash-source__avatar"
                style={
                  {
                    "--source-tone": source.tone,
                    "--source-tone-bg": source.toneBg,
                  } as CSSProperties
                }
              >
                {source.initials}
              </span>
              <div className="dash-source__body">
                <div className="dash-source__name">{source.name}</div>
                <div className="dash-source__meta">{source.meta}</div>
              </div>
              <div className="dash-source__rank">{source.rank}</div>
            </div>
          ))}

          <div className="dash-card__foot">
            QS 2027 · THE 2026 · ARWU 2026 · U.S. News 2026–2027
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card__head">
            <div>
              <div className="dash-card__title">Start a record</div>
              <div className="dash-card__subtitle">
                Shortcuts to the pages in your menu
              </div>
            </div>
          </div>

          {shortcuts.map((shortcut) => (
            <div key={shortcut.name} className="dash-shortcut">
              <span className="dash-shortcut__icon">{shortcut.icon}</span>
              <div className="dash-shortcut__body">
                <div className="dash-shortcut__name">{shortcut.name}</div>
                <div className="dash-shortcut__desc">{shortcut.desc}</div>
              </div>
              <button
                type="button"
                className="dash-shortcut__open"
                onClick={() => navigate(shortcut.to)}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="dash-card">
        <div className="dash-card__head">
          <div>
            <div className="dash-card__title">University records</div>
          </div>
          <button
            type="button"
            className="dash-shortcut__open"
            onClick={() => navigate("/universities")}
          >
            View all
          </button>
        </div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>University</th>
              <th>Country</th>
              <th>City</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {universityRecords.map((record) => (
              <tr key={record.university}>
                <td>{record.university}</td>
                <td>{record.country}</td>
                <td>{record.city}</td>
                <td>
                  <StatusPill
                    label={record.status}
                    variant={statusVariant[record.status]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardPage;
