"use client";

import {
  Mail,
  UserCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
  Building,
  LineChart,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const ROTATION_RANGE = 5;
const PERSPECTIVE = 400;

const StatItem = ({ value, label, icon, color }) => (
  <div className="group relative overflow-hidden rounded-xl border border-border/30 bg-white p-4 shadow-sm">
    <div
      className="absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl opacity-30"
      style={{ backgroundColor: color }}
    />
    <div className="flex items-start gap-3">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 break-words">{value}</h3>
        <p className="text-xs font-medium text-gray-500 break-words">{label}</p>
      </div>
    </div>
  </div>
);

const AdminCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [ROTATION_RANGE, -ROTATION_RANGE]);
  const rotateY = useTransform(x, [-50, 50], [-ROTATION_RANGE, ROTATION_RANGE]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex items-center justify-center py-6">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{ perspective: PERSPECTIVE }}
        className="relative touch-none"
      >
        <motion.div style={{ rotateX, rotateY }} transition={{ type: "spring", stiffness: 100, damping: 30 }}>
          <motion.div
            className="relative h-48 w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 p-6 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">VISA</span>
              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs hover:bg-white/30"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </motion.button>
            </div>
            <div className="mt-6 text-white">
              <p className="text-lg">
                {isVisible ? "4111 1111 1111 9743" : "**** **** **** 9743"}
              </p>
              <p className="text-sm mt-1">Emily Victoria</p>
              <p className="text-sm">12/24</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function AboutAdmin() {
  const stats = [
    {
      value: "Emily Victoria",
      label: "Administrador",
      icon: <UserCircle className="h-4 w-4" />,
      color: "#9D8EF8",
    },
    {
      value: "admin@smartcity.com",
      label: "Email Corporativo",
      icon: <Mail className="h-4 w-4" />,
      color: "#8AC0FF",
    },
    {
      value: "Zona Norte da Cidade de São Paulo",
      label: "Região de Gerência",
      icon: <MapPin className="h-4 w-4" />,
      color: "#69D9DE",
    },
    {
      value: "Ativo",
      label: "Status do Sistema",
      icon: <ShieldCheck className="h-4 w-4" />,
      color: "#AEE26B",
    },
  ];

  return (
    <section className="relative overflow-hidden py-8 md:py-10 w-full font-[Poppins]">
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <div className="mb-3 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-[#9D8EF8]/20 bg-[#9D8EF8]/10 px-3 py-0.5 text-xs font-medium text-[#9D8EF8]">
              <Sparkles className="mr-1 h-3 w-3" />
              Painel do Administrador
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Informações do Admin
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Dados pessoais e credenciais do sistema SmartCity
          </p>
        </div>

        <div className="mb-8">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={index} {...stat} />
            ))}
          </div>
        </div>

        <AdminCard />

        <div className="grid gap-6 md:grid-cols-2 mb-8 mt-8">
          <div className="space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#F8B2E1] text-white">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Missão</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Monitorar, administrar e inovar soluções tecnológicas que promovam o bem-estar dos cidadãos
              e a eficiência dos serviços urbanos.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#8AC0FF] text-white">
              <LineChart className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">Visão</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Ser referência em administração de cidades inteligentes, usando dados e tecnologia para transformar
              a vida urbana de forma sustentável.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-gray-500 leading-relaxed">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#69D9DE] text-white">
            <Building className="h-4 w-4" />
          </div>
          <p>
            A gestão da SmartCity é feita com base em inovação, dados em tempo real e políticas públicas
            integradas. A segurança digital e transparência são pilares fundamentais da nossa atuação.
          </p>
        </div>
      </div>
    </section>
  );
}
