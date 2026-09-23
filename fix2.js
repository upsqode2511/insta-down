import fs from 'fs';

const path = 'src/components/Downloader.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<button type="submit" className="download-btn" disabled=\{loading\}>\s*\{loading \? \(\s*<\/h2>/m;

const replacement = `<button type="submit" className="download-btn" disabled={loading}>
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            )}
            {loading ? 'Processing...' : dict.downloader.download}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '2rem' }}>
            <ResultCard data={result} onRetry={() => setResult(null)} />
          </div>
        )}

        </div>
      </main>
      </div>

      {(activeTab === 'video' || activeTab === 'reel') && (
        <>
          <section className="container" style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#333' }}>
          {title}
        </h2>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Successfully fixed Downloader.tsx!");
} else {
  console.log("Could not find search string.");
}
