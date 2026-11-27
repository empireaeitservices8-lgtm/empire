"use client";

import React, {
  memo,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search, UserX, X } from "lucide-react";

/* ========================================================================== */
/* 1. TEAM MEMBERS DATA                                                       */
/* Change names, roles, departments or `image` (path or full https:// URL).   */
/* ========================================================================== */

export type Department =
  | "All"
  | "Engineering"
  | "Design"
  | "Marketing"
  | "Business"
  | "Operations"
  | "Content Creator"
  | "QA";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: Exclude<Department, "All">;
  /** Image path or URL. Use p("02") for /team/photo-one/photos-02.jpg */
  image: string;
};

const DEPARTMENTS: Department[] = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Business",
  "Operations",
  "Content Creator",
  "QA",
];

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "diy4ratd";
// w_600 / c_limit: the browser downloads and decodes a small image instead of a huge original
const CLOUDINARY_TEAM_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_600,c_limit/empire-ae/team`;

const p = (n: string) => `${CLOUDINARY_TEAM_BASE}/photos-${n}.jpg`;

const TEAM_MEMBERS: TeamMember[] = [
  { id: "bijin-mohan", name: "Bijin Mohan", role: "Business Development Manager", department: "Business", image: "/team/PHOTO-ONE/bijin.jpg" },
  { id: "sayooj-deepak", name: "Sayooj Deepak M", role: "Digital Marketing Manager", department: "Marketing", image: "/team/PHOTO-ONE/sayooj.png" },
  { id: "meera-m", name: "Meera M", role: "Sr. Graphic Designer", department: "Design",  image: "/team/PHOTO-ONE/meera.jpg"  },
  { id: "shyamil-k-v", name: "Shyamil K V", role: "Accountant & Finance", department: "Operations",  image: "/team/PHOTO-ONE/shyamil.jpg" },
  { id: "nidheesh-krishna", name: "Nidheesh Krishna N", role: "Flutter Developer", department: "Engineering",  image: "/team/PHOTO-ONE/nidhesh.jpg"  },
  { id: "jaffar", name: "Jaffar", role: "Odoo Developer", department: "Engineering",  image: "/team/PHOTO-ONE/jaffar.jpg"  },
  { id: "silpa-raji", name: "Silpa Raji", role: "Content Creator", department: "Content Creator",  image: "/team/PHOTO-ONE/silpa.jpg"  },
  { id: "muhammed-nabeel", name: "Muhammed Nabeel", role: "Python Developer", department: "Engineering",  image: "/team/PHOTO-ONE/nabeel.jpg" },
  { id: "aslam-k-m", name: "Aslam K M", role: "Flutter Developer", department: "Engineering", image: "/team/PHOTO-ONE/aslam.jpg"  },

  { id: "alen-shaji", name: "Alen Shaji", role: "Operations Assistant", department: "Operations",  image: "/team/PHOTO-ONE/alan.jpg" },
  // BUSINESS
  { id: "gayathri-harsha", name: "Gayathri Harsha M", role: "Business Development Executive", department: "Business",  image: "/team/PHOTO-ONE/gayatri.jpg"  },
  { id: "karishma-h-k", name: "Karishma H.K", role: "Business Development Executive", department: "Business",  image: "/team/PHOTO-ONE/karishma.jpg" },
  { id: "sayed-ali", name: "Sayed Ali", role: "Business Development Executive", department: "Business",  image: "/team/PHOTO-ONE/sayeed.jpg"  },
  { id: "tony", name: "Tony", role: "Business Development Executive", department: "Business",  image: "/team/PHOTO-ONE/tony.jpg" },
  // DESIGN
  { id: "alpha-nelson", name: "Alpha Nelson", role: "Graphic Designer", department: "Design", image: "/team/PHOTO-ONE/alpha.jpg"  },
  { id: "arya-p-u", name: "Arya P U", role: "Graphic Designer", department: "Design",  image: "/team/PHOTO-ONE/arya.jpg"  },
  //odoo
  { id: "akhil-sabu", name: "Akhil Sabu", role: "Odoo Developer", department: "Engineering",  image: "/team/PHOTO-ONE/akhil.jpg"  },
  { id: "adithya", name: "Adithya", role: "Odoo Functional Consultant", department: "Engineering",  image: "/team/PHOTO-ONE/adithya.jpg" },
  { id: "abeya", name: "Abeya", role: "Odoo Developer", department: "Engineering",  image: "/team/PHOTO-ONE/abeya.jpg"  },
  { id: "sinan", name: "Sinan", role: "Odoo Developer", department: "Engineering",  image: "/team/PHOTO-ONE/sinan.jpg"  },
  // ENGINEERING
  { id: "sonamol-c-m", name: "Sonamol C M", role: "Backend Developer", department: "Engineering",  image: "/team/PHOTO-ONE/sona.jpg" },
  { id: "jabzeena-m-a", name: "Jabzeena M A", role: "Python Developer", department: "Engineering",  image: "/team/PHOTO-ONE/jabzeena.jpg" },
  { id: "jemson-jacob", name: "Jemson Jacob", role: "Flutter Developer", department: "Engineering",  image: "/team/PHOTO-ONE/jemson.jpg"  },
  { id: "nicy-K-kabir", name: "Nicy K kabir", role: "Flutter Developer", department: "Engineering", image:"/team/PHOTO-ONE/nicy.jpg" },
  { id: "abin", name: "Abin CS", role: "Software Developer", department: "Engineering",  image: "/team/PHOTO-ONE/abin.png"  },
  { id: "rameesa", name: "Rameesa Bava", role: "Software Developer", department: "Engineering",  image: "/team/PHOTO-ONE/rameesa.png"  },
  { id: "teffin", name: "Teffin Bose", role: "Software Developer", department: "Engineering",  image: "/team/PHOTO-ONE/teffin.png"  },
  { id: "krishnendu", name: "Krishnendu Dinesh", role: "Software Developer", department: "Engineering",  image: "/team/PHOTO-ONE/krishnendu.png"  },
  { id: "athmaja", name: "Athmaja V", role: "Software Developer", department: "Engineering",  image: "/team/PHOTO-ONE/athmaja.png"  },
  // MARKETING
  { id: "nandana", name: "Nandana KM", role: "Digital Marketing Executive", department: "Marketing",  image: "/team/PHOTO-ONE/nandana.jpg"  },
  { id: "arjun-shaji", name: "Arjun Shaji", role: "Digital Marketing Executive", department: "Marketing",  image: "/team/PHOTO-ONE/arjun.png"  },
  { id: "aswathy-v", name: "Aswathy V", role: "Digital Marketing Executive", department: "Marketing",  image: "/team/PHOTO-ONE/ashwathy.jpg"  },
  { id: "soji", name: "Soji Kurian", role: "Digital Marketing Executive", department: "Marketing",  image: "/team/PHOTO-ONE/soji.png"  },


  // OPERATIONS
  { id: "nahla-nasarin", name: "Nahla Nasarin K.N", role: "Operations Executive", department: "Operations", image: "/team/PHOTO-ONE/nahla.jpg"  },
  { id: "j-mahadev", name: "J Mahadev", role: "Operations Executive", department: "Operations",  image: "/team/PHOTO-ONE/mahadev.jpg" },
  // QA
  { id: "raina-ranjan", name: "Raina Ranjan", role: "Software QA Tester", department: "QA", image: "/team/PHOTO-ONE/raina.jpg"  },
  { id: "shilpa-p-r", name: "Shilpa P R", role: "Software QA Tester", department: "QA", image: "/team/PHOTO-ONE/shilpa.jpg"  },
];

/* ========================================================================== */
/* 2. CARD                                                                    */
/* Smooth-scroll fixes:                                                       */
/*  - content-visibility:auto  -> off-screen cards are not painted/laid out   */
/*  - skeleton shimmer + fade-in -> no layout jump or blank flash on load     */
/*  - GPU hints on the hover-zoom image                                       */
/*  - First 8 load immediately, the rest lazily                               */
/* ========================================================================== */

const MemberCard = memo(function MemberCard({
  member,
  eager,
}: {
  member: TeamMember;
  eager: boolean;
}) {
  const [src, setSrc] = useState(member.image);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // If the image was already cached/loaded before React attached onLoad
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const handleError = () => {
    setLoaded(false);
    // If Cloudinary URL failed, fall back to local file
    if (src.includes("res.cloudinary.com")) {
      const filename = src.split("/").pop();
      if (filename) {
        if (filename.toLowerCase().startsWith("soji")) {
          setSrc("/team/pic/soji.PNG");
          return;
        }
        if (filename.toLowerCase().startsWith("arjun")) {
          setSrc("/team/pic/Arjun.jpeg");
          return;
        }
        setSrc(`/team/PHOTO-ONE/${filename}`);
        return;
      }
    }
    if (src.includes("/team/PHOTO-ONE/")) {
      setSrc(src.replace("/team/PHOTO-ONE/", "/team/photo-one/"));
    } else if (src.includes("/team/photo-one/")) {
      setSrc(src.replace("/team/photo-one/", "/team/PHOTO-ONE/"));
    } else {
      setFailed(true);
    }
  };

  return (
    <article className="group [content-visibility:auto] [contain-intrinsic-size:auto_420px]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-[#1a1f29] [transform:translateZ(0)]">
        {failed ? (
          <div className="grid h-full w-full place-items-center text-5xl font-semibold text-white/25">
            {member.name.charAt(0)}
          </div>
        ) : (
          <>
            {/* Loading skeleton */}
            {!loaded && (
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#1a1f29] via-[#232a36] to-[#1a1f29]"
              />
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt={member.name}
              width={600}
              height={800}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : "auto"}
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded(true)}
              onError={handleError}
              className={`h-full w-full transform-gpu object-cover object-top will-change-transform transition-[transform,opacity] duration-500 ease-out group-hover:scale-105 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        )}

        {/* Department (Engineering, Design...) over the image, top right */}
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {member.department}
        </span>
      </div>

      {/* Name and job title below the image */}
      <div className="px-1 pt-4">
        <h3 className="text-lg font-semibold leading-snug text-white">
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm text-[#76ABAE]">{member.role}</p>
      </div>
    </article>
  );
});

/* ========================================================================== */
/* 3. PAGE                                                                    */
/* ========================================================================== */

export default function TeamPage() {
  const [selectedDept, setSelectedDept] = useState<Department>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Typing stays instant; the heavy grid re-render is deferred
  const deferredQuery = useDeferredValue(searchQuery);

  const deptCounts = useMemo(() => {
    const counts: Record<Department, number> = {
      All: TEAM_MEMBERS.length,
      Engineering: 0,
      Design: 0,
      Marketing: 0,
      Business: 0,
      Operations: 0,
      "Content Creator": 0,
      QA: 0,
    };
    TEAM_MEMBERS.forEach((m) => {
      counts[m.department] += 1;
    });
    return counts;
  }, []);

  const filteredMembers = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return TEAM_MEMBERS.filter((m) => {
      const inDept = selectedDept === "All" || m.department === selectedDept;
      const inSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      return inDept && inSearch;
    });
  }, [selectedDept, deferredQuery]);

  const resetFilters = () => {
    setSelectedDept("All");
    setSearchQuery("");
  };

  return (
    <main
      data-nav-theme="dark"
      className="min-h-screen bg-black text-white selection:bg-[#76ABAE] selection:text-black"
    >
      {/* Header: plain, left-aligned */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 sm:px-8 sm:pt-40 lg:px-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Our team
            </h1>
            <p className="mt-3 text-base text-white/55">
              {TEAM_MEMBERS.length} people, {DEPARTMENTS.length - 1} departments,
              one office.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name or role"
              aria-label="Search team members"
              className="w-full rounded-2xl bg-[#14181f] py-3.5 pl-11 pr-10 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 transition focus:ring-[#76ABAE]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Department tabs: underline style */}
        <div className="mt-10 flex gap-6 overflow-x-auto border-b border-white/10 sm:gap-8">
          {DEPARTMENTS.map((dept) => {
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                aria-pressed={active}
                className={`-mb-px shrink-0 whitespace-nowrap border-b-2 pb-3 text-sm font-medium outline-none transition-colors focus-visible:text-white sm:text-base ${
                  active
                    ? "border-[#76ABAE] text-white"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                {dept}
                <span className="ml-1.5 text-white/35">{deptCounts[dept]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-14">
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {filteredMembers.map((member, i) => (
              <MemberCard key={member.id} member={member} eager={i < 8} />
            ))}
          </div>
        ) : (
          <div className="mx-auto my-20 max-w-sm text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-white/10 text-white/50">
              <UserX size={22} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No one found</h3>
            <p className="mt-2 text-sm text-white/60">
              Nothing matches your search. Try another name or role.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}