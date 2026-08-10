import React, { useState } from 'react';
import { 
  Code2, Database, FolderTree, FileCode, Map, Copy, Check, 
  Terminal, Layers, Sparkles, Server, CreditCard, ShieldCheck, Cpu 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';
import { 
  TECH_STACK_RECOMMENDATIONS, PROJECT_DIRECTORY_STRUCTURE, 
  POSTGRES_SQL_SCHEMA, PRISMA_SCHEMA_CODE, CODE_SNIPPETS, STEP_BY_STEP_ROADMAP 
} from '../../data/blueprintData';

export const BlueprintExplorer: React.FC = () => {
  const { blueprintTab, setBlueprintTab } = useEcommerce();

  const [activeSnippetId, setActiveSnippetId] = useState(CODE_SNIPPETS[0].id);
  const [schemaMode, setSchemaMode] = useState<'er' | 'prisma' | 'sql'>('er');
  const [copied, setCopied] = useState(false);

  const selectedSnippet = CODE_SNIPPETS.find(s => s.id === activeSnippetId) || CODE_SNIPPETS[0];

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Blueprint Header */}
      <div className="bg-white border-2 border-[#1A1A1A] p-6 md:p-8 space-y-4 shadow-[6px_6px_0px_#1A1A1A] relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-white text-xs font-mono font-bold uppercase tracking-wider">
          <Code2 className="w-3.5 h-3.5" /> Technical Specification Architecture Blueprint
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-black text-[#1A1A1A] tracking-tight uppercase">
          Full-Stack Architectural Implementation Guide
        </h1>
        <p className="text-[#5A5A40] text-xs sm:text-sm max-w-3xl leading-relaxed font-sans font-medium">
          Comprehensive production blueprint detailing database ER schemas, project folder taxonomy, production code snippets for state management & payment integration, and an executed 6-phase engineering roadmap.
        </p>

        {/* Blueprint Navigation Tabs */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => setBlueprintTab('architecture')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border border-[#1A1A1A] ${
              blueprintTab === 'architecture' ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]' : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
            }`}
          >
            <Layers className="w-4 h-4" /> 1. Stack Rationale
          </button>

          <button
            onClick={() => setBlueprintTab('schema')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border border-[#1A1A1A] ${
              blueprintTab === 'schema' ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]' : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
            }`}
          >
            <Database className="w-4 h-4" /> 2. Database ER Schema
          </button>

          <button
            onClick={() => setBlueprintTab('folder')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border border-[#1A1A1A] ${
              blueprintTab === 'folder' ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]' : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
            }`}
          >
            <FolderTree className="w-4 h-4" /> 3. Folder Directory
          </button>

          <button
            onClick={() => setBlueprintTab('snippets')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border border-[#1A1A1A] ${
              blueprintTab === 'snippets' ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]' : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
            }`}
          >
            <FileCode className="w-4 h-4" /> 4. Production Code
          </button>

          <button
            onClick={() => setBlueprintTab('roadmap')}
            className={`px-3.5 py-2 text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 border border-[#1A1A1A] ${
              blueprintTab === 'roadmap' ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]' : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
            }`}
          >
            <Map className="w-4 h-4" /> 5. Build Roadmap
          </button>
        </div>
      </div>

      {/* TAB 1: Recommended Tech Stack */}
      {blueprintTab === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_STACK_RECOMMENDATIONS.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#1A1A1A] p-5 space-y-3 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white bg-[#1A1A1A] px-2.5 py-0.5 font-bold">
                    {item.layer}
                  </span>
                  <span className="text-[10px] font-mono text-[#5A5A40] uppercase">ENTERPRISE GRADE</span>
                </div>

                <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">{item.recommended}</h3>
                <p className="text-xs text-[#1A1A1A] leading-relaxed font-sans">{item.reason}</p>

                <div className="pt-2 border-t border-[#1A1A1A] flex items-center gap-2 text-[11px] text-[#5A5A40] font-mono">
                  <span className="uppercase font-bold">Alternatives:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.alternatives.map((alt, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#F9F8F6] border border-[#1A1A1A] text-[#1A1A1A]">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Database Schema */}
      {blueprintTab === 'schema' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_#1A1A1A]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">Relational Database Entity Schema</h3>
                <p className="text-xs font-mono text-[#5A5A40]">ENTITIES: USERS, CATEGORIES, PRODUCTS, ORDERS, ORDER_ITEMS, REVIEWS</p>
              </div>

              <div className="flex items-center bg-[#F9F8F6] p-1 border border-[#1A1A1A] text-xs font-mono font-bold uppercase">
                <button
                  onClick={() => setSchemaMode('er')}
                  className={`px-3 py-1.5 transition-all ${
                    schemaMode === 'er' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  Visual ER
                </button>
                <button
                  onClick={() => setSchemaMode('prisma')}
                  className={`px-3 py-1.5 transition-all ${
                    schemaMode === 'prisma' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  Prisma
                </button>
                <button
                  onClick={() => setSchemaMode('sql')}
                  className={`px-3 py-1.5 transition-all ${
                    schemaMode === 'sql' ? 'bg-[#1A1A1A] text-white' : 'text-[#1A1A1A]'
                  }`}
                >
                  SQL DDL
                </button>
              </div>
            </div>

            {/* Visual ER Diagram Mode */}
            {schemaMode === 'er' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-mono">
                
                {/* Users Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: users</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>name VARCHAR(255)</li>
                    <li>email VARCHAR(255) UNIQUE</li>
                    <li>role VARCHAR(20) [CUSTOMER|ADMIN]</li>
                    <li>avatar_url TEXT</li>
                  </ul>
                </div>

                {/* Categories Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: categories</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>name VARCHAR(100)</li>
                    <li>slug VARCHAR(100) UNIQUE</li>
                    <li>description TEXT</li>
                  </ul>
                </div>

                {/* Products Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: products</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>title VARCHAR(255)</li>
                    <li>price DECIMAL(10,2)</li>
                    <li>🔗 category_id → categories.id</li>
                    <li>stock INT</li>
                  </ul>
                </div>

                {/* Orders Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: orders</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>🔗 user_id → users.id</li>
                    <li>status ENUM</li>
                    <li>total_amount DECIMAL(10,2)</li>
                    <li>shipping_address JSONB</li>
                  </ul>
                </div>

                {/* Order Items Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: order_items</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>🔗 order_id → orders.id</li>
                    <li>🔗 product_id → products.id</li>
                    <li>quantity INT</li>
                  </ul>
                </div>

                {/* Reviews Table */}
                <div className="bg-[#F9F8F6] p-4 border border-[#1A1A1A] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase">table: reviews</span>
                    <span className="text-[10px] text-[#5A5A40]">PK: id</span>
                  </div>
                  <ul className="space-y-1 text-[#1A1A1A] text-[11px]">
                    <li>🔑 <strong className="text-[#1A1A1A]">id</strong> VARCHAR(36)</li>
                    <li>🔗 product_id → products.id</li>
                    <li>rating INT (1-5)</li>
                    <li>comment TEXT</li>
                  </ul>
                </div>

              </div>
            )}

            {/* Prisma / SQL Code View */}
            {schemaMode !== 'er' && (
              <div className="relative">
                <button
                  onClick={() => handleCopyCode(schemaMode === 'prisma' ? PRISMA_SCHEMA_CODE : POSTGRES_SQL_SCHEMA)}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 z-10 border border-[#1A1A1A]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
                </button>
                <pre className="bg-[#1A1A1A] text-[#F9F8F6] border border-[#1A1A1A] p-5 font-mono text-xs overflow-x-auto max-h-96">
                  <code>{schemaMode === 'prisma' ? PRISMA_SCHEMA_CODE : POSTGRES_SQL_SCHEMA}</code>
                </pre>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 3: Directory Folder Structure */}
      {blueprintTab === 'folder' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_#1A1A1A]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">Directory Tree & Structural Layout</h3>
                <p className="text-xs font-mono text-[#5A5A40]">PRODUCTION NEXT.JS 15 APP ROUTER DIRECTORY TAXONOMY</p>
              </div>
              <button
                onClick={() => handleCopyCode(PROJECT_DIRECTORY_STRUCTURE)}
                className="px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 border border-[#1A1A1A]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED!' : 'COPY TREE'}</span>
              </button>
            </div>

            <pre className="bg-[#1A1A1A] text-[#F9F8F6] border border-[#1A1A1A] p-5 font-mono text-xs overflow-x-auto">
              <code>{PROJECT_DIRECTORY_STRUCTURE}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: Key Code Snippets */}
      {blueprintTab === 'snippets' && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CODE_SNIPPETS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSnippetId(s.id)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase whitespace-nowrap transition-all border border-[#1A1A1A] ${
                  activeSnippetId === s.id
                    ? 'bg-[#1A1A1A] text-white shadow-[2px_2px_0px_#5A5A40]'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#F9F8F6]'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="bg-white border border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_#1A1A1A]">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
              <div>
                <h3 className="font-serif font-bold text-[#1A1A1A] text-sm uppercase">{selectedSnippet.title}</h3>
                <p className="text-xs text-[#5A5A40] font-sans">{selectedSnippet.description}</p>
                <span className="font-mono text-[10px] font-bold text-[#1A1A1A] uppercase mt-1 block">{selectedSnippet.filename}</span>
              </div>

              <button
                onClick={() => handleCopyCode(selectedSnippet.code)}
                className="px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-mono font-bold uppercase flex items-center gap-1.5 border border-[#1A1A1A]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
              </button>
            </div>

            <pre className="bg-[#1A1A1A] text-[#F9F8F6] border border-[#1A1A1A] p-5 font-mono text-xs overflow-x-auto max-h-[500px]">
              <code>{selectedSnippet.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 5: Step-by-Step Build Plan Roadmap */}
      {blueprintTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="space-y-6">
            {STEP_BY_STEP_ROADMAP.map(phase => (
              <div key={phase.phase} className="bg-white border border-[#1A1A1A] p-6 space-y-4 shadow-[4px_4px_0px_#1A1A1A]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1A1A1A] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A5A40] font-bold">
                      PHASE 0{phase.phase} • {phase.duration}
                    </span>
                    <h3 className="font-serif font-black text-[#1A1A1A] text-base uppercase">{phase.title}</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto">
                    VERIFIED
                  </span>
                </div>

                <p className="text-xs text-[#1A1A1A] font-sans">{phase.summary}</p>

                <div className="space-y-2 pt-1">
                  {phase.tasks.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-[#F9F8F6] p-3 border border-[#1A1A1A] text-xs">
                      <div className="p-1 bg-[#1A1A1A] text-white shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-[#1A1A1A]">{t.task}</p>
                        <p className="text-[11px] font-mono text-[#5A5A40] mt-0.5">{t.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
